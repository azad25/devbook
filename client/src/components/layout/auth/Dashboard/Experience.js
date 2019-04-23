import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import {deleteExperience} from '../../../../actions/profileActions';

class Experience extends Component {
  onDeleteClick(id){
      this.props.deleteExperience(id);
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp.id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
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
    console.log(experience);
    
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{(experience.length !== 0) ? experience : (
              <tr><td>No experiences added</td></tr>
              )}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(
  null,
  {deleteExperience}
)(withRouter(Experience));
