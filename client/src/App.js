import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import store from "./store";
import "./App.css";

import PrivateRoute from "./components/common/PrivateRoute";

import NotFound from "./components/layout/404/NotFound";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/layout/auth/Login";
import Register from "./components/layout/auth/Register";
import Dashboard from "./components/layout/auth/Dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

// check for token

if (localStorage.jwt) {
  //set auth token to header auth
  setAuthToken(localStorage.jwt);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwt);
  //set current user with decoded
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // log out user after token expiration
    store.dispatch(clearCurrentProfile());
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route
                exact
                path="/"
                component={props => <Landing {...props} />}
              />
              <Route
                exact
                path="/login"
                component={props => <Login {...props} />}
              />
              <Route
                exact
                path="/register"
                component={props => <Register {...props} />}
              />
              <Route
                exact
                path="/developers"
                component={props => <Profiles {...props} />}
              />
              <Route
                exact
                path="/p/:handle"
                component={props => <Profile {...props} />}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/add-experience" component={AddExperience} />
              <PrivateRoute path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/feed" component={props => <Posts {...props} />} />
              <PrivateRoute exact path="/post/:id" component={props => <Post {...props} />} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
