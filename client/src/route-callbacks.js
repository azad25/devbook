import store from './store';
import {getProfilePhoto} from './actions/profileActions';

export function onNavbarLoad(){
    store.dispatch(getProfilePhoto);
}