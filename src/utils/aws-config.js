import AWS from 'aws-sdk';
import { parse, unparse } from 'papaparse';

AWS.config.update({
    region: 'eu-north-1',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const fetchCsvFileContent = async (bucketName, fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };

    try {
        const data = await s3.getObject(params).promise();
        const csvContent = data.Body.toString('utf-8');
        const parsedData = parse(csvContent, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });

        return parsedData.data;
    } catch (error) {
        console.error('Error fetching CSV file:', error);
        throw error;
    }
};

export const uploadCsvFileContent = async (updatedData) => {
    const env = process.env.REACT_APP_ENV;
    const fileName = env === 'production' ? 'faund-that-production.csv' : 'faund-that-develop.csv';
    const bucketName = 'ascot-faund-that';

    const csvContent = unparse(updatedData);

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: csvContent,
        ContentType: 'text/csv',
    };

    try {
        await s3.putObject(params).promise();
        console.log('CSV file uploaded successfully, overwriting existing file');
    } catch (error) {
        console.error('Error uploading CSV file:', error);
        throw error;
    }
};

export default s3;