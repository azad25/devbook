import { SET_CURRENT_USER } from "../actions/types";
import {isEmpty} from "../validation/is-empty";

const initialState = {
  user: {},
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      }
    default:
      return state;
  }
};
