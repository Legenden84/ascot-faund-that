import AWS from 'aws-sdk';

AWS.config.update({
    region: 'eu-north-1',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const uploadFile = (file, bucketName) => {
    const params = {
        Bucket: bucketName,
        Key: file.name,
        Body: file,
    };

    return s3.upload(params).promise();
};

export const listFiles = (bucketName) => {
    const params = {
        Bucket: bucketName,
    };

    return s3.listObjectsV2(params).promise();
};

export const downloadFile = (bucketName, fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };

    return s3.getObject(params).promise();
};

export default s3;
