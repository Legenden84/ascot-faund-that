import { uploadCsvFileContent } from '../utils/aws-config';
import { UPDATE_CSV } from './AwsActions';

export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';

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

export const updateCsv = (updatedData) => ({
    type: UPDATE_CSV,
    payload: updatedData,
});

export const deleteItems = () => (dispatch, getState) => {
    const { aws, mainWindow } = getState();
    const updatedData = aws.csvData.map((row) => {
        if (mainWindow.selectedRows.includes(row)) {
            return {
                ...row,
                deleted: new Date().toISOString().split('T')[0],
            };
        }
        return row;
    });

    dispatch(updateCsv(updatedData));
    uploadCsvFileContent(updatedData);
};

export const restoreItems = () => (dispatch, getState) => {
    const { aws, mainWindow } = getState();
    const updatedData = aws.csvData.map((row) => {
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