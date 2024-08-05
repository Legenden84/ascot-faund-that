export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';

// Action for selected rows
export const setSelectedRows = (selectedRows) => {
    return {
        type: SET_SELECTED_ROWS,
        payload: selectedRows,
    };
};

// Action for date range
export const setDateRange = (dateRange) => {
    return {
        type: SET_DATE_RANGE,
        payload: dateRange,
    };
};

// Action for filter text
export const setFilterText = (text) => {
    return {
        type: SET_FILTER_TEXT,
        payload: text,
    };
};
