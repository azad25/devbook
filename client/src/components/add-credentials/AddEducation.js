import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import { addEducation } from "../../actions/profileActions";
import TopBarProgress from "../../utils/progressbar";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
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
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="section add-education">
        {this.props.loading && <TopBarProgress />}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                <i className="fas fa-arrow-left" /> Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school/bootcamp or universities you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="School Name"
                    name="school"
                    type="text"
                    value={this.state.school}
                    onChange={this.onChange}
                    error={errors.school}
                    info="School Name"
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Degree or certification"
                    name="degree"
                    type="text"
                    value={this.state.degree}
                    onChange={this.onChange}
                    error={errors.degree}
                    info="Degree or Certification you achieved"
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Field of Study"
                    name="fieldOfStudy"
                    type="text"
                    value={this.state.fieldOfStudy}
                    onChange={this.onChange}
                    error={errors.fieldOfStudy}
                    info="enter the field of study"
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
                    name="to"
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
                      Currently studying
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <TextAreaGroup
                    placeholder="Program description"
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Short description about the program you are in"
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

addEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
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
  { addEducation }
)(withRouter(AddEducation));
