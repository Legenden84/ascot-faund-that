import { FETCH_CSV_SUCCESS, FETCH_CSV_FAILURE, UPDATE_CSV } from '../actions/AwsActions';

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
        case UPDATE_CSV:
            return {
                ...state,
                csvData: action.payload,
            };
        default:
            return state;
    }
};

export default awsReducer;