import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    profile == null || loading
      ? (dashboardContent = <Spinner />)
      : Object.keys(profile).length > 0
      ? (dashboardContent = <h4>Display profile</h4>)
      : (dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome, {user.name}
            </p>
            <p>You have not setup profile, please add profile</p>
            <Link to="/create-profile" className="btn btn-md btn-primary">Create Profile</Link>
          </div>
        ));

    return (
      <div className="dashbaord screen-height">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProops = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProops,
  { getCurrentProfile }
)(Dashboard);
