import { uploadCsvFileContent } from '../utils/aws-config';
import { UPDATE_CSV } from './AwsActions';

export const NUKE_CSV = 'NUKE_CSV';
export const REMOVE_OLD_DELETED_ROWS = 'REMOVE_OLD_DELETED_ROWS';
export const DELETE_OLD_ROWS = 'DELETE_OLD_ROWS';
export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS';
export const SET_DATE_RANGE = 'SET_DATE_RANGE';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';
export const SET_TABLE_ORDER = 'SET_TABLE_ORDER';

export const nukeCsv = () => async (dispatch) => {
    const updatedData = [];
    dispatch({
        type: UPDATE_CSV,
        payload: updatedData,
    });
    await uploadCsvFileContent(updatedData);
};

export const removeOldDeletedRows = () => (dispatch, getState) => {
    const { aws } = getState();
    const currentDate = new Date();

    const updatedData = aws.csvData.filter(row => {
        if (!row.deleted) return true;

        const deletedDate = new Date(row.deleted);
        const daysDifference = (currentDate - deletedDate) / (1000 * 60 * 60 * 24);

        return daysDifference <= 90;
    });

    dispatch({
        type: UPDATE_CSV,
        payload: updatedData,
    });

    uploadCsvFileContent(updatedData);
};

export const deleteOldRows = () => (dispatch, getState) => {
    const { aws } = getState();
    const currentDate = new Date();

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const updatedData = aws.csvData.map(row => {
        const createdDate = new Date(row.created.split('-').reverse().join('-'));
        const daysDifference = (currentDate - createdDate) / (1000 * 60 * 60 * 24);

        // Mark as deleted only if older than 90 days and not already deleted
        if (daysDifference > 90 && !row.deleted) {
            return {
                ...row,
                deleted: formatDate(currentDate),
            };
        }

        return row;
    });

    dispatch({
        type: UPDATE_CSV,
        payload: updatedData,
    });

    uploadCsvFileContent(updatedData);
};

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

export const setTableOrder = (order) => ({
    type: SET_TABLE_ORDER,
    payload: order,
});

export const updateCsv = (updatedData) => async (dispatch) => {
    dispatch({
        type: UPDATE_CSV,
        payload: updatedData,
    });
    await uploadCsvFileContent(updatedData);
};

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