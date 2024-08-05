import { uploadCsvFileContent, fetchCsvFileContent } from '../utils/aws-config';

export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';
export const FETCH_CSV_SUCCESS = 'FETCH_CSV_SUCCESS';
export const UPDATE_CSV = 'UPDATE_CSV';

// Action creator for setting selected rows
export const setSelectedRows = (selectedRows) => ({
    type: SET_SELECTED_ROWS,
    payload: selectedRows,
});

// Action creator for setting date range
export const setDateRange = (dateRange) => ({
    type: SET_DATE_RANGE,
    payload: dateRange,
});

// Action creator for setting filter text
export const setFilterText = (text) => ({
    type: SET_FILTER_TEXT,
    payload: text,
});

// Action creator for successfully fetching CSV data
export const fetchCsvSuccess = (csvData) => ({
    type: FETCH_CSV_SUCCESS,
    payload: csvData,
});

// Action creator for updating CSV data
export const updateCsv = (updatedData) => ({
    type: UPDATE_CSV,
    payload: updatedData,
});

// Thunk action for fetching CSV data from S3
export const fetchCsv = () => async (dispatch) => {
    try {
        const csvData = await fetchCsvFileContent('your-bucket-name', 'your-file-name.csv');
        dispatch(fetchCsvSuccess(csvData));
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
};

// Thunk action for deleting items
export const deleteItems = () => (dispatch, getState) => {
    const { mainWindow } = getState();
    const updatedData = mainWindow.csvData.map((row) => {
        if (mainWindow.selectedRows.includes(row)) {
            return {
                ...row,
                deleted: new Date().toISOString().split('T')[0], // Insert current date in 'deleted' column
            };
        }
        return row;
    });

    dispatch(updateCsv(updatedData));  // Update state
    uploadCsvFileContent(updatedData);  // Upload modified CSV to S3
};

// Thunk action for restoring items
export const restoreItems = () => (dispatch, getState) => {
    const { mainWindow } = getState();
    const updatedData = mainWindow.csvData.map((row) => {
        if (mainWindow.selectedRows.includes(row)) {
            return {
                ...row,
                deleted: '', // Clear the 'deleted' column
            };
        }
        return row;
    });

    dispatch(updateCsv(updatedData));  // Update state
    uploadCsvFileContent(updatedData);  // Upload modified CSV to S3
};
