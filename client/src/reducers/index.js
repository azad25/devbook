import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});