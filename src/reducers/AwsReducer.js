import { FETCH_CSV_SUCCESS, FETCH_CSV_FAILURE } from '../actions/AwsActions';

const initialState = {
    csvData: [],
    error: null,
};

const awsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CSV_SUCCESS:
            return {
                ...state,
                csvData: action.payload,
            };
        case FETCH_CSV_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default awsReducer;