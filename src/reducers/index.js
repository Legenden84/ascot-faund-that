import { combineReducers } from 'redux';
import SidepanelReducer from './SidepanelReducer';

const rootReducer = combineReducers({
    sidepanel: SidepanelReducer,
});

export default rootReducer;