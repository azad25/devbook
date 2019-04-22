import axios from "axios";
import {
  SET_CURRENT_USER,
  GET_PROFILE,
  PROFILE_LOADING,
  SET_PROFILE_PHOTO,
  SET_NAVBAR_PROFILE_PHOTO,
  CLEAR_CURRENT_PROFILE,
  DELETE_PROFILE,
  GET_ERRORS,
  GET_PROFILE_PHOTO
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
  dispatch(setProfileLoading());
  axios
    .post("/api/profile", profileData)
    .then(() => history.push("/dashboard"))
    .catch(err => {
      let errors = null;
      if (err.response.data) {
        errors = err.response.data;
      } else {
        errors = err;
      }
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

//upload profile photo

export const uploadPhoto = photo => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/profile/upload", photo)
    .then(res =>
      dispatch({
        type: SET_PROFILE_PHOTO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get profile photo

export const getProfilePhoto = () => dispatch => {
  axios
    .get("/api/profile/photo")
    .then(res => {
      let data = res.data.replace(/public\\uploads\\/g, "");
      dispatch({
        type: GET_PROFILE_PHOTO,
        payload: data
      });
      dispatch({
        type: SET_NAVBAR_PROFILE_PHOTO,
        payload: data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// clear profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// delete profile

export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This can not be undone!')){
    dispatch(setProfileLoading());
    axios.delete('/api/profile')
    .then(res => {
      dispatch({
        type: DELETE_PROFILE,
        payload: {}
      })
      dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })})
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
  }
}
