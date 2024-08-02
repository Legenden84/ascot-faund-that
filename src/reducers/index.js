import { combineReducers } from 'redux';
import NavbarReducer from './NavbarReducer';

const rootReducer = combineReducers({
    navbar: NavbarReducer,
});

export default rootReducer;