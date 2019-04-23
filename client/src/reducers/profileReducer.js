import {
  GET_PROFILE,
  GET_PROFILE_PHOTO,
  LOADING,
  SET_PROFILE_PHOTO,
  SET_NAVBAR_PROFILE_PHOTO,
  CLEAR_CURRENT_PROFILE,
  DELETE_PROFILE,
  GET_ERRORS
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PROFILE:
      return {
        ...state,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
      case GET_PROFILE_PHOTO:
      return {
        ...state,
        profilePhoto: action.payload,
        loading: false
      };
    case SET_PROFILE_PHOTO:
      return {
        ...state,
        profilePhoto: action.payload,
        loading: false
      };
    case SET_NAVBAR_PROFILE_PHOTO:
      return {
        ...state,
        profilePhoto: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_ERRORS :
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};
