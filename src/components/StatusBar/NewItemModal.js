import React, { Component } from 'react';
import './NewItemModal.css';

class NewItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: props.room || '',
            description: props.description || '',
            code: props.code || '',
            phone: props.phone || '',
            email: props.email || '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                room: this.props.room || '',
                description: this.props.description || '',
                code: this.props.code || '',
                phone: this.props.phone || '',
                email: this.props.email || '',
            });
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSave = () => {
        const { csvData, addNewRowToCsv, updateRowInCsv, onClose, isEdit, rowId } = this.props;

        if (isEdit) {
            // Editing an existing row
            const updatedRow = {
                ID: rowId,
                room: this.state.room,
                description: this.state.description,
                "country-code": this.state.code,
                phone: this.state.phone,
                email: this.state.email,
                contacted: false,
                status: null,
            };
            updateRowInCsv(updatedRow);
        } else {
            // Creating a new row
            let maxId = 0;

            if (csvData.length > 0) {
                csvData.forEach(row => {
                    const currentId = parseInt(row.ID, 16);
                    if (currentId > maxId) {
                        maxId = currentId;
                    }
                });
            }

            const newId = '0x' + (maxId + 1).toString(16).toUpperCase().padStart(4, '0');

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

            const newRow = {
                ID: newId,
                created: formattedDate,
                deleted: "",
                room: this.state.room,
                description: this.state.description,
                "country-code": this.state.code,
                phone: this.state.phone,
                email: this.state.email,
                contacted: false,
                status: null,
            };

            addNewRowToCsv(newRow);
        }

        onClose();
    };

    render() {
        const { isOpen, onClose } = this.props;

        if (!isOpen) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{this.props.isEdit ? 'Edit Item' : 'Create New Item'}</h2>
                    </div>
                    <div className="modal-body">
                    <label>
                            Room
                            <input
                                type="text"
                                name="room"
                                value={this.state.room}
                                onChange={this.handleChange}
                                className="input-field"
                            />
                        </label>
                        <label>
                            Description
                            <textarea
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                className="input-field"
                            ></textarea>
                        </label>
                        <label>
                            Code
                            <input
                                type="text"
                                name="code"
                                value={this.state.code}
                                onChange={this.handleChange}
                                className="input-field"
                            />
                        </label>
                        <label>
                            Phone
                            <input
                                type="text"
                                name="phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                className="input-field"
                            />
                        </label>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                className="input-field"
                            />
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button className="action-button" onClick={this.handleSave}>
                            {this.props.isEdit ? 'Save Changes' : 'Create'}
                        </button>
                        <button className="action-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewItemModal;
