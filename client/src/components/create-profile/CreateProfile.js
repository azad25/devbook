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

import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInput: false,
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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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

  fileEventHandler = e => {
    this.setState({
      photo: e.target.files[0]
    }, () => {});
  };
  onSubmit(e) {
    e.preventDefault();

    let data = new FormData();
    data.append("handle", this.state.handle);
    data.append("company", this.state.company);
    data.append("website", this.state.website);
    data.append("location", this.state.location);
    data.append("status", this.state.status);
    data.append("githubUsername", this.state.githubUsername);
    data.append("skills", this.state.skills);
    data.append("bio", this.state.bio);
    data.append("twitter", this.state.twitter);
    data.append("facebook", this.state.facebook);
    data.append("linkedIn", this.state.linkedIn);
    data.append("instagram", this.state.instagram);

    data.append("photo", this.state.photo);
    
    this.props.createProfile(data);
  }
  render() {
    const { errors, displaySocialInput } = this.state;
    let socialInput;

    if (displaySocialInput) {
      socialInput = (
        <div>
          <InputGroup
            placeholder="Twitter url"
            name="Twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onTagInput={this.getTagInput}
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
      { label: "* Select Professional Status", value: 0 },
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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="photo"
                      className="custom-file-input form-control form-control-lg"
                      onChange={this.fileEventHandler}
                    />
                    <label className="custom-file-label">
                      Select Profile Picture
                    </label>
                    <small className="form-text text-muted">
                      <i className="fas fa-lightbulb text-primary" /> Upload
                      Profile Photo
                    </small>
                    {errors.photo && (
                      <div className="invalid-feedback">
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
                />

                <TagInput
                  name="skills"
                  setTagInput={this.setTagInput}
                  info="Tell us your skills"
                  error={errors.skills}
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
