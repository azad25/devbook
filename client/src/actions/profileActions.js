import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// get current profile

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//create profile

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(() => history.push("/dashboard"))
    // .catch(err => {
    //   let errors = null;
    //   if (err.response.data) {
    //     errors = err.response.data
    //   }else{
    //     errors = err;
    //   }
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: errors
    //   });
    // });
};

// clear profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// get profiles
