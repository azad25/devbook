import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import {deleteEducation} from '../../../../actions/profileActions';

class Education extends Component {
  onDeleteClick(id){
      this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education.map(exp => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td>{exp.degree}</td>
        <td>{exp.fieldofstudy}</td>
        <td>
          <Moment format="D,MMM YYYY">{exp.from}</Moment> -{' '}
          {exp.to === null
            ? "Present"
            : <Moment format="D,MMM YYYY">{exp.to}</Moment>}
        </td>
        <td>
          <button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">
            <i class="fas fa-trash-alt" />
          </button>
        </td>
      </tr>
    ));    
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{(education.length !== 0) ? education : (
              <tr><td>No education details added</td></tr>
              )}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(
  null,
  {deleteEducation}
)(withRouter(Education));
