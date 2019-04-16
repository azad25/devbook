import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import SelectListGroup from "../common/SelectListGroup";
import InputGroup from "../common/InputGroup";
import AutoSuggestion from "../common/AutoSuggestion";
import TagInput from "../common/TagInput";

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
      skills: "",
      githubUsername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedIn: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("submit");
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
      socialInput="";
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

                <TextFieldGroup
                  placeholder="Profile Handle"
                  name="handle"
                  type="text"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique name for your profile url. It can be your name/company or nickname"
                />

                <AutoSuggestion name="Location" info="Tell us your city" />

                <TagInput name="skills" info="Tell us your skills" />

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

export default connect(mapStateToProps)(CreateProfile);
