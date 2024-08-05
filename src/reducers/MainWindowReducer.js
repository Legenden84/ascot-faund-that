import { SET_SELECTED_ROWS, SET_DATE_RANGE, SET_FILTER_TEXT } from '../actions/MainWindowActions';

const initialState = {
    selectedRows: [],
    dateRange: {
        startDate: null,
        endDate: null,
    },
    filterText: '',
};

const mainWindowReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default mainWindowReducer;
