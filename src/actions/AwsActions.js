import { fetchCsvFileContent, uploadCsvFileContent } from '../utils/aws-config';

export const FETCH_CSV_SUCCESS = 'FETCH_CSV_SUCCESS';
export const FETCH_CSV_FAILURE = 'FETCH_CSV_FAILURE';
export const UPDATE_CSV = 'UPDATE_CSV';

export const fetchCsv = () => {
    return async (dispatch) => {
        const env = process.env.REACT_APP_ENV;
        const fileName = env === 'production' ? 'faund-that-production.csv' : 'faund-that-develop.csv';
        const bucketName = 'ascot-faund-that';

        try {
            const { data, lastModified } = await fetchCsvFileContent(bucketName, fileName);
            console.log("lastModified", lastModified)
            dispatch({
                type: FETCH_CSV_SUCCESS,
                payload: { data, lastModified },
            });
        } catch (error) {
            dispatch({
                type: FETCH_CSV_FAILURE,
                error: error.message,
            });
        }
    };
};

export const updateCsv = (updatedData) => async (dispatch, getState) => {
    const state = getState();
    const lastModified = state.aws.lastModified;

    try {
        const env = process.env.REACT_APP_ENV;
        const fileName = env === 'production' ? 'faund-that-production.csv' : 'faund-that-develop.csv';
        const bucketName = 'ascot-faund-that';

        const { lastModified: latestLastModified, data: latestData } = await fetchCsvFileContent(bucketName, fileName);

        if (lastModified && new Date(lastModified) < new Date(latestLastModified)) {
            const mergedData = mergeCsvData(latestData, updatedData);

            await uploadCsvFileContent(mergedData);

            dispatch({
                type: UPDATE_CSV,
                payload: mergedData,
            });

        } else {
            await uploadCsvFileContent(updatedData);

            dispatch({
                type: UPDATE_CSV,
                payload: updatedData,
            });
        }
    } catch (error) {
        console.error('Error uploading CSV:', error);
    }
};

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

const mergeCsvData = (latestData, updatedData) => {
    const mergedData = [...latestData];

    updatedData.forEach((updatedRow) => {
        const index = mergedData.findIndex(row => row.ID === updatedRow.ID);

        if (index !== -1) {
            mergedData[index] = { ...mergedData[index], ...updatedRow };
        } else {
            mergedData.push(updatedRow);
        }
    });

    return mergedData;
};