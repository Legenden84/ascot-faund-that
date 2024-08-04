import { combineReducers } from 'redux';
import awsReducer from './AwsReducer';
import sidepanelReducer from './SidepanelReducer';

const rootReducer = combineReducers({
    aws: awsReducer,
    sidepanel: sidepanelReducer,
});

export default rootReducer;
