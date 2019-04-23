import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import {
  getProfilePhoto,
  clearCurrentProfile
} from "../../actions/profileActions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: ""
    };
  }
  componentWillMount(){
    this.props.getProfilePhoto();
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  }
  onAvatarClick(e){
    e.preventDefault();
    this.props.history.push('/dashboard')
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const link = "";

    let newImg = this.props.getProfilePhotoPath
      ? this.props.getProfilePhotoPath
      : "profile.png";

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href={link}
            onClick={this.onAvatarClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={`/uploads/${newImg}`}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
            />
          </a>
        </li>
        <li className="nav-item">
          <a
            href={link}
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/developers">
                  {" "}
                  Developers{" "}
                </Link>
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  getProfilePhotoPath: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  getProfilePhotoPath: state.profile.profilePhoto
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getProfilePhoto }
)(withRouter(Navbar));
