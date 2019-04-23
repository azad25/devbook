import axios from "axios";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER,LOADING, USER_REGISTERED } from "./types";
import setAuthToken from "../utils/setAuthToken";

// loading

export const setLoading = () => {
  return {
    type: LOADING
  };
};

//register user

export const registerUser = (userData, history) => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch(() => {
        return {
          type: USER_REGISTERED
        }
      })
      history.push("/login")}
      )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token

export const loginUser = userData => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/users/login", userData)
    .then(res => {
        //save token to local storage
        const { token } = res.data;
        //set token to local storage
        localStorage.setItem('jwt', token);
        //set token to auth header
        setAuthToken(token);
        //decode token to get user data
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
}

// log out user

export const logoutUser = history => dispatch => {
  dispatch(setLoading());
  //remove token from local storage
  localStorage.removeItem('jwt');
  // remove auth header for next requests
  setAuthToken(false);

  dispatch(setCurrentUser({}));

  history.push("/login");
}
