import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty } from "../../validation/is-empty";

class ProfieItem extends Component {
  render() {
    const { profile } = this.props;
    let photo = "";
    if (!isEmpty(profile.photo)) {
      photo = profile.photo.path.replace(/public\W*uploads\W*/i, "");
    } else {
      photo = "profile.png";
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={`/uploads/${photo}`} alt="" className="img-fluid" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              <i class="fas fa-briefcase" />{" "} {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              <i class="fas fa-map-marker-alt"></i> {" "}
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/p/${profile.handle}`} className="btn btn-md btn-primary">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfieItem;
