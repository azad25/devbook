import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from './store';
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/layout/auth/Login";
import Register from "./components/layout/auth/Register";
import Dashboard from "./components/layout/auth/Dashboard";


// check for token

if(localStorage.jwt){
  //set auth token to header auth
  setAuthToken(localStorage.jwt);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwt);
  //set current user with decoded
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    // log out user after token expiration
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
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={props => <Login {...props} />} />
            <Route exact path="/register" component={props => <Register {...props} />} />
            <Route exact path="/dashboard" component={props => <Dashboard {...props} />} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
