import React, { Component } from 'react';
import './NewItemModal.css';

class NewItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: '',
            description: '',
            code: '',
            phone: '',
            email: '',
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleCreate = () => {
        const { csvData, addNewRowToCsv, onClose } = this.props;

        let newId;

        if (csvData.length === 0) {
            newId = '0x0001';
        } else {
            const lastRow = csvData[csvData.length - 1];
            const lastId = parseInt(lastRow.ID, 16);
            newId = '0x' + (lastId + 1).toString(16).toUpperCase();

            newId = '0x' + newId.slice(2).padStart(4, '0');
        }

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
        onClose();
    };

    render() {
        const { isOpen, onClose } = this.props;

        if (!isOpen) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Create New Item</h2>
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
                        <button className="action-button" onClick={this.handleCreate}>
                            Create
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