import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import AutoSuggestion from "../common/AutoSuggestion";
import TagInput from "../common/TagInput";
import TopBarProgress from "../../utils/progressbar";
import { isEmpty } from "../../validation/is-empty";

import {
  createProfile,
  getCurrentProfile,
  uploadPhoto,
  getProfilePhoto
} from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInput: false,
      displayProfilePhoto: "",
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: [],
      githubUsername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedIn: "",
      instagram: "",
      photo: {},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setTagInput = this.setTagInput.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // bring skills array back to tags
      const skills = [];

      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.githubUsername = !isEmpty(profile.githubUsername)
        ? profile.githubUsername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};

      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.social.linkedIn = !isEmpty(profile.social.linkedIn)
        ? profile.social.linkedIn
        : "";
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      // set component field state;

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: profile.skills,
        githubUsername: profile.githubUsername,
        bio: profile.bio,
        facebook: profile.social.facebook,
        twitter: profile.social.twitter,
        linkedIn: profile.social.linkedIn,
        instagram: profile.social.instagram
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  setTagInput(data) {
    this.setState({
      skills: data
    });
  }
  setLocation(data) {
    this.setState({
      location: data
    });
  }

  fileSelect(e) {
    e.preventDefault();
    document.getElementById("selectImage").click();
  }

  fileEventHandler = e => {
    this.setState(
      {
        photo: e.target.files[0]
      },
      () => {
        let data = new FormData();

        data.append("photo", this.state.photo);

        this.props.uploadPhoto(data);

        this.props.getProfilePhoto();

        if (this.props.profilePhoto) {
          document.getElementsByClassName("profileImg")[0].src =
            "/uploads/" + this.props.profilePhoto;
        }
      }
    );
  };
  onSubmit(e) {
    e.preventDefault();

    let profile = {};
    let history = this.props.history;

    profile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUsername: this.state.githubUsername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn,
      instagram: this.state.instagram,
      photo: this.props.profile.photo
    };

    this.props.createProfile(profile, history);
  }
  render() {
    const { errors, displaySocialInput } = this.state;
    let socialInput;
    setTimeout(() => {
      if (this.props.profilePhoto) {
        document.getElementsByClassName("profileImg")[0].src =
          "/uploads/" + this.props.profilePhoto;
      }
    }, 100);

    if (displaySocialInput) {
      socialInput = (
        <div>
        <InputGroup
            placeholder="Twitter url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Instagram url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="linkedIn url"
            name="linkedIn"
            icon="fab fa-linkedin"
            value={this.state.linkedIn}
            onChange={this.onChange}
            error={errors.linkedIn}
          />
        </div>
      );
    } else {
      socialInput = "";
    }
    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: "Select Professional Status" },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile mb-3">
        {this.props.loading && <TopBarProgress />}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="custom-file">
                    <div>
                      <img
                        src="/uploads/profile.png"
                        style={{ width: "20%" }}
                        className="image-responsive mx-auto d-block profileImg"
                        alt="sample profile photo"
                      />
                      <div className="overlay">
                        <button
                          type="button"
                          onClick={this.fileSelect.bind(this)}
                          className="icon"
                        >
                          <i className="fas fa-camera" />
                        </button>
                      </div>
                      <input
                        type="file"
                        name="photo"
                        id="selectImage"
                        className="custom-file-input form-control form-control-lg"
                        onChange={this.fileEventHandler}
                      />
                    </div>

                    <label className="custom-file-label">
                      Select Profile Picture
                    </label>
                    <small className="form-text text-muted">
                      <i className="fas fa-lightbulb text-primary" /> Upload
                      Profile Photo
                    </small>
                    {errors.photo && (
                      <div className="invalid-feedback d-block">
                        <i className="fas fa-exclamation-triangle" />{" "}
                        {errors.photo}
                      </div>
                    )}
                  </div>
                </div>
                <TextFieldGroup
                  placeholder="Profile Handle"
                  name="handle"
                  type="text"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique name for your profile url. It can be your name/company or nickname"
                />

                <SelectListGroup
                  name="status"
                  type="text"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Tell us here are you in your career now"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  type="text"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Tell us where do you work"
                />

                <AutoSuggestion
                  name="Location"
                  info="Tell us your city"
                  setLocation={this.setLocation}
                  error={errors.location}
                  value={this.state.location}
                />

                <TagInput
                  name="skills"
                  setTagInput={this.setTagInput}
                  info="Tell us your skills"
                  error={errors.skills}
                  tags={this.state.skills}
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  type="text"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Enter your website"
                />

                <TextFieldGroup
                  placeholder="Github"
                  name="githubUsername"
                  type="text"
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info="Enter your github url"
                />

                <TextAreaGroup
                  placeholder="Short bio"
                  name="bio"
                  type="text"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us something about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={prevState => {
                      this.setState({
                        displaySocialInput: !prevState.displaySocialInput
                      });
                    }}
                    className="btn btn-light mr-2"
                  >
                    <i className="fas fa-thumbtack text-primary" /> Add Social
                    Media Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInput}
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-primary float-right mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  photo: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  getProfilePhoto: PropTypes.func.isRequired,
  profilePhoto: PropTypes.string
};

const mapStateToProps = state => ({
  profile: state.profile,
  photo: state.photo,
  profilePhoto: state.profile.profilePhoto,
  loading: state.profile.loading,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile, uploadPhoto, getProfilePhoto }
)(withRouter(CreateProfile));
