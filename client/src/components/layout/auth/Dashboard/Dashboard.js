import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { getCurrentProfile,getProfilePhoto, deleteAccount } from "../../../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Spinner from "../../../common/Spinner";
import TopBarProgress from '../../../../utils/progressbar';

import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getProfilePhoto();
  }
  onDeleteClick(e){
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    profile == null || loading
      ? (dashboardContent = <Spinner />)
      : Object.keys(profile).length > 0
      ? (dashboardContent = 
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`p/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div style={{marginBottom: '60px'}}>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        )
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
      <div className="dashbaord">
        {this.props.loading &&
        <TopBarProgress />}
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
  getCurrentProfile: PropTypes.func.isRequired,
  getProfilePhoto: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProops = state => ({
  auth: state.auth,
  profile: state.profile,
  loading: state.profile.loading
});

export default connect(
  mapStateToProops,
  { getCurrentProfile,getProfilePhoto,deleteAccount }
)(Dashboard);
