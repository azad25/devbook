import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import store from './store';
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/layout/auth/Login";
import Register from "./components/layout/auth/Register";


// check for token

if(localStorage.jwt){
  //set auth token to header auth
  setAuthToken(localStorage.jwt);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwt);
  //set current user with decoded
  store.dispatch(setCurrentUser(decoded));
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
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
