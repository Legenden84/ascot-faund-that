import { uploadCsvFileContent, fetchCsvFileContent } from '../utils/aws-config';

export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';
export const FETCH_CSV_SUCCESS = 'FETCH_CSV_SUCCESS';
export const UPDATE_CSV = 'UPDATE_CSV';

export const setSelectedRows = (selectedRows) => ({
    type: SET_SELECTED_ROWS,
    payload: selectedRows,
});

export const setDateRange = (dateRange) => ({
    type: SET_DATE_RANGE,
    payload: dateRange,
});

export const setFilterText = (text) => ({
    type: SET_FILTER_TEXT,
    payload: text,
});

export const fetchCsvSuccess = (csvData) => ({
    type: FETCH_CSV_SUCCESS,
    payload: csvData,
});

export const updateCsv = (updatedData) => ({
    type: UPDATE_CSV,
    payload: updatedData,
});

export const fetchCsv = () => async (dispatch) => {
    try {
        const csvData = await fetchCsvFileContent('your-bucket-name', 'your-file-name.csv');
        dispatch(fetchCsvSuccess(csvData));
    } catch (error) {
        console.error('Error fetching CSV:', error);
    }
};

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

    dispatch(updateCsv(updatedData));
    uploadCsvFileContent(updatedData);
};

export const restoreItems = () => (dispatch, getState) => {
    const { mainWindow } = getState();
    const updatedData = mainWindow.csvData.map((row) => {
        if (mainWindow.selectedRows.includes(row)) {
            return {
                ...row,
                deleted: '',
            };
        }
        return row;
    });

    dispatch(updateCsv(updatedData));
    uploadCsvFileContent(updatedData);
};