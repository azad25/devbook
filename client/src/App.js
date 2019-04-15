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

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/layout/auth/Login";
import Register from "./components/layout/auth/Register";
import Dashboard from "./components/layout/auth/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";

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
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={props => <Landing {...props} />} />
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
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
