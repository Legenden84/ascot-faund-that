export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';

export const setSelectedRows = (selectedRows) => {
    return {
        type: SET_SELECTED_ROWS,
        payload: selectedRows,
    };
};