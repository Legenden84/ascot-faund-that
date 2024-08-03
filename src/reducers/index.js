import { combineReducers } from 'redux';
import AwsReducer from './AwsReducer';

const rootReducer = combineReducers({
    aws: AwsReducer,
});

export default rootReducer;