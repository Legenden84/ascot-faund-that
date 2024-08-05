import { combineReducers } from 'redux';
import awsReducer from './AwsReducer';
import mainWindowReducer from './MainWindowReducer';
import sidepanelReducer from './SidepanelReducer';

const rootReducer = combineReducers({
    aws: awsReducer,
    mainWindow: mainWindowReducer,
    sidepanel: sidepanelReducer,
});

export default rootReducer;