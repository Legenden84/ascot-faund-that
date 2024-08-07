import React, { useState } from 'react';
import './NewItemModal.css';

const NewItemModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        room: '',
        description: '',
        code: '',
        phone: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
                            value={formData.room}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        Description
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-field"
                        ></textarea>
                    </label>
                    <label>
                        Code
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        Phone
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="modal-footer">
                    <button className="action-button" onClick={onClose}>
                        Create
                    </button>
                    <button className="action-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewItemModal;