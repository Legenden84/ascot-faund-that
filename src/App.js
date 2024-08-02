import React, { Component } from 'react';
import './App.css';
import { uploadFile, listFiles, downloadFile } from './utils/aws-config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            files: [],
        };
    }

    componentDidMount() {
        this.fetchFiles();
    }

    handleFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleUpload = async () => {
        const { selectedFile } = this.state;
        const bucketName = 'ascot-faund-that';

        if (selectedFile) {
            try {
                await uploadFile(selectedFile, bucketName);
                alert('File uploaded successfully');
                this.fetchFiles(); // Refresh the file list after upload
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('File upload failed');
            }
        }
    };

    fetchFiles = async () => {
        const bucketName = 'ascot-faund-that';

        try {
            const data = await listFiles(bucketName);
            this.setState({ files: data.Contents });
        } catch (error) {
            console.error('Error listing files:', error);
        }
    };

    handleDownload = async (fileName) => {
        const bucketName = 'ascot-faund-that';

        try {
            const data = await downloadFile(bucketName, fileName);
            const url = URL.createObjectURL(new Blob([data.Body]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    render() {
        const { files } = this.state;
        console.log("process.env.REACT_ENV", process.env.REACT_ENV)
        return (
            <div className="App">
                <h1>AWS S3 File Manager</h1>
                <input type="file" onChange={this.handleFileChange} />
                <button onClick={this.handleUpload}>Upload File</button>
                <h2>Files in S3 Bucket</h2>
                <ul>
                    {files.map((file) => (
                        <li key={file.Key}>
                            {file.Key}{' '}
                            <button onClick={() => this.handleDownload(file.Key)}>
                                Download
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;
