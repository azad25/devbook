import React, { Component } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    const options = {
      strings: [
        "Create a developer profile/portfolio",
        "Share posts",
        "And get help from other developers"
      ],
      typeSpeed: 40,
      loop: true,
      loopCount: Infinity,
      showCursor: false
    };
    this.typed = new Typed(this.el, options);
  }
  componentWillUnmount() {
    this.typed.destroy();
  }
  render() {
    const { auth } = this.props;
    let authlink;
    if (!auth.isAuthenticated) {
      authlink = (
        <div>
          <Link to="/register" className="btn btn-md btn-primary mt-5 mr-2">
            Sign Up
          </Link>
          <Link to="login" className="btn btn-md mt-5 btn-light">
            Login
          </Link>
        </div>
      );
    }else{
      authlink = (
          <Link to="/dashboard" className="btn btn-md btn-primary mt-5 mr-2">
            Dashbaord
          </Link>
      );
    }
    return (
      <div className="landing screen-height">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">
                  A social network for programmers
                </h1>
                <p
                  className="text-center lead"
                  ref={el => {
                    this.el = el;
                  }}
                />
                <hr />
                {authlink}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
