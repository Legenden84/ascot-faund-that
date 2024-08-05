import {
    SET_SELECTED_ROWS,
    SET_DATE_RANGE,
    SET_FILTER_TEXT,
    FETCH_CSV_SUCCESS,
    UPDATE_CSV,
} from '../actions/MainWindowActions';

const initialState = {
    csvData: [],
    selectedRows: [],
    dateRange: {
        startDate: null,
        endDate: null,
    },
    filterText: '',
};

const mainWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CSV_SUCCESS:
            return {
                ...state,
                csvData: action.payload,
            };
        case SET_SELECTED_ROWS:
            return {
                ...state,
                selectedRows: action.payload,
            };
        case SET_DATE_RANGE:
            return {
                ...state,
                dateRange: action.payload,
            };
        case SET_FILTER_TEXT:
            return {
                ...state,
                filterText: action.payload,
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

export default mainWindowReducer;