import { FETCH_CSV_SUCCESS, FETCH_CSV_FAILURE } from '../actions/AwsActions';

const initialState = {
    csvData: [],
    error: null,
};

const AwsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CSV_SUCCESS:
            return {
                ...state,
                csvData: action.payload,
                error: null,
            };
        case FETCH_CSV_FAILURE:
            return {
                ...state,
                csvData: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default AwsReducer;
