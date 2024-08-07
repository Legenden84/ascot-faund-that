// AwsActions.js
import { fetchCsvFileContent, uploadCsvFileContent } from '../utils/aws-config';

export const FETCH_CSV_SUCCESS = 'FETCH_CSV_SUCCESS';
export const FETCH_CSV_FAILURE = 'FETCH_CSV_FAILURE';
export const UPDATE_CSV = 'UPDATE_CSV';

export const addNewRowToCsv = (newRow) => async (dispatch, getState) => {
    try {
        const state = getState();
        const csvData = [...state.aws.csvData];

        csvData.push(newRow);

        dispatch({
            type: UPDATE_CSV,
            payload: csvData,
        });

        await uploadCsvFileContent(csvData);
    } catch (error) {
        console.error('Error adding new row to CSV:', error);
    }
};

export const fetchCsv = () => {
    return async (dispatch) => {
        const env = process.env.REACT_APP_ENV;
        const fileName = env === 'production' ? 'faund-that-production.csv' : 'faund-that-develop.csv';
        const bucketName = 'ascot-faund-that';

        try {
            const csvData = await fetchCsvFileContent(bucketName, fileName);
            dispatch({
                type: FETCH_CSV_SUCCESS,
                payload: csvData,
            });
        } catch (error) {
            dispatch({
                type: FETCH_CSV_FAILURE,
                error: error.message,
            });
        }
    };
};

export const updateCsv = (updatedData) => async (dispatch) => {
    dispatch({
        type: UPDATE_CSV,
        payload: updatedData,
    });
    await uploadCsvFileContent(updatedData);
};