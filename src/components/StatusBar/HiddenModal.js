import React, { Component } from 'react';
import './HiddenModal.css';

class HiddenModal extends Component {
    state = {
        password: '',
        isAuthenticated: false,
        error: ''
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
                                <button onClick={this.handlePasswordSubmit} className="SubmitButton">
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default HiddenModal;