import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import AutoSuggestion from "../common/AutoSuggestion";
import { addExperience } from "../../actions/profileActions";
import TopBarProgress from "../../utils/progressbar";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  setLocation(data) {
    this.setState({
      location: data
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  }
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="section add-experience">
      {this.props.loading && <TopBarProgress />}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                <i className="fas fa-arrow-left" /> Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    type="text"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="Company Name"
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Job Title"
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                    info="Your role in the company"
                  />
                </div>
                <div className="form-grou">
                  <AutoSuggestion
                    name="Location"
                    info="Tell us your city"
                    setLocation={this.setLocation}
                    error={errors.location}
                    value={this.state.location}
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="From"
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                    info="From Date"
                  />
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="To"
                    name="To"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    info="To Date"
                    disabled={this.state.disabled ? "disabled" : ""}
                  />
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label className="form-check-label" htmlFor="current">
                      Current Job
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <TextAreaGroup
                    placeholder="Short description"
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Short description about what your role is"
                  />
                  <small className="form-text text-muted">
                    Some of your responsabilities, etc
                  </small>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
