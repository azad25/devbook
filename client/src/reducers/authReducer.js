import { SET_CURRENT_USER,LOADING,USER_REGISTERED, GET_ERRORS } from "../actions/types";
import {isEmpty} from "../validation/is-empty";

const initialState = {
  user: {},
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_REGISTERED:
      return {
        ...state,
        loading: false
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        loading: false
      }
    case GET_ERRORS :
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};
