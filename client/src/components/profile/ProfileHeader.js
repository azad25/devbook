import React, { Component } from "react";
import {isEmpty} from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    let photo = "";
    if(!isEmpty(profile.photo)){
        photo = profile.photo.path.replace(/public\W*uploads\W*/i, "");
    }else{
        photo = "profile.png";
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="img-fluid"
                  src={`/uploads/${photo}`}
                  style={{maxHeight:'400px'}}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center text-dark">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                <i class="fas fa-briefcase" />{" "}
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              <i class="fas fa-map-marker-alt"></i> {" "}
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-primary p-2"
                    href={"http://"+profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-primary p-2"
                    href={"http://"+profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-primary p-2"
                    href={"http://"+profile.social.facebook}
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedIn) ? null : (
                  <a
                    className="text-primary p-2"
                    href={"http://"+profile.social.linkedIn}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-primary p-2"
                    href={"http://"+profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
