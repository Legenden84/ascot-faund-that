import AWS from 'aws-sdk';
import { parse } from 'papaparse';

// AWS configuration
AWS.config.update({
    region: 'eu-north-1',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const fetchCsvFileContent = async (bucketName, fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName, // Use original file name in the S3 params
    };

    try {
        // Fetching the object from S3
        const data = await s3.getObject(params).promise();

        // Convert the file content to a string
        const csvContent = data.Body.toString('utf-8');

        // Parse the CSV content using PapaParse
        const parsedData = parse(csvContent, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });

        return parsedData.data; // Return the parsed data as an array of objects
    } catch (error) {
        console.error('Error fetching CSV file:', error);
        throw error;
    }
};

export default s3;
