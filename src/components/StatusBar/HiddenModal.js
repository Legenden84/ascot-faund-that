import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import './HiddenModal.css';

class HiddenModal extends Component {
    state = {
        password: '',
        isAuthenticated: false,
        error: '',
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handlePasswordSubmit = () => {
        const correctPassword = 'admin';
        if (this.state.password === correctPassword) {
            this.setState({ isAuthenticated: true, error: '' });
        } else {
            this.setState({ error: 'Incorrect password. Please try again.' });
        }
    };

    handleNuke = () => {
        if (window.confirm("Are you sure you want to delete all rows? This action cannot be undone.")) {
            this.props.nukeCsv();
            this.props.onClose();
        }
    };

    triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };

    handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet);

                const newCsvData = this.prepareData(rows);
                this.uploadDataToS3(newCsvData);
            };
            reader.readAsArrayBuffer(selectedFile);
        } catch (error) {
            console.error('Error processing file:', error);
        }
    };

    prepareData = (rows) => {
        const { csvData } = this.props;
        const newCsvData = [...csvData];

        rows.forEach((row, index) => {
            const lastRow = newCsvData.length > 0 ? newCsvData[newCsvData.length - 1] : null;
            let newId;

            if (lastRow) {
                const lastId = parseInt(lastRow.ID, 16);
                newId = '0x' + (lastId + 1).toString(16).toUpperCase().padStart(4, '0');
            } else {
                newId = '0x0001';
            }

            let createdDate = null;

            if (typeof row.created === 'number') {
                createdDate = new Date(Date.UTC(1900, 0, row.created - 1));
            } else if (row.created instanceof Date) {
                createdDate = row.created;
            } else if (typeof row.created === 'string') {
                createdDate = new Date(row.created);

                if (isNaN(createdDate.getTime())) {
                    createdDate = null;
                }
            }

            if (!createdDate) {
                createdDate = new Date();
            }

            const formattedDate = `${createdDate.getDate().toString().padStart(2, '0')}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getFullYear()}`;

            const newRow = {
                ID: newId,
                room: row.room || '',
                created: formattedDate,
                description: row.description || '',
                phone: row.phone || '',
                email: row.email || '',
                deleted: row.deleted || '',
                'country-code': row['country-code'] || '',
                contacted: row.contacted || false,
                status: row.status || '',
            };

            newCsvData.push(newRow);
        });

        return newCsvData;
    };

    uploadDataToS3 = async (data) => {
        try {
            await this.props.updateCsv(data);
            alert('Data successfully uploaded to S3!');
        } catch (error) {
            console.error('Error uploading data to S3:', error);
            alert('Failed to upload data to S3.');
        }
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { isAuthenticated, error } = this.state;

        if (!isOpen) return null;

        return (
            <div className="hidden-modal-overlay">
                <div className="hidden-modal-content">
                    <div className="hidden-modal-header">
                        <h2>Admin Actions</h2>
                        <button onClick={onClose}>&times;</button>
                    </div>
                    <div className="hidden-modal-body">
                        {!isAuthenticated ? (
                            <div>
                                <p>Please enter the password to access this action:</p>
                                <input
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    className="password-input"
                                />
                                <button onClick={this.handlePasswordSubmit} className="NukeButton">
                                    Submit
                                </button>
                                {error && <p className="error">{error}</p>}
                            </div>
                        ) : (
                            <div>
                                <p>Password accepted. You can now proceed with the action.</p>
                                <button className="NukeButton" onClick={this.handleNuke}>
                                    NUKE (Delete All)
                                </button>
                                <button className="NukeButton" onClick={this.triggerFileInput}>
                                    Import Excel File
                                </button>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={this.handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default HiddenModal;