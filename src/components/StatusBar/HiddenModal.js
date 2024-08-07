import React from 'react';
import './HiddenModal.css';

class HiddenModal extends React.Component {
    handleNuke = () => {
        if (window.confirm("Are you sure you want to delete all rows? This action cannot be undone.")) {
            this.props.nukeCsv();
            this.props.onClose(); // Close the modal after nuking
        }
    };

    render() {
        const { isOpen, onClose } = this.props;

        if (!isOpen) return null;

        return (
            <div className="hidden-modal-overlay">
                <div className="hidden-modal-content">
                    <div className="hidden-modal-header">
                        <h2>Admin Actions</h2>
                        <button onClick={onClose}>&times;</button>
                    </div>
                    <div className="hidden-modal-body">
                        <p>This is a hidden modal with administrative actions.</p>
                        <button className="NukeButton" onClick={this.handleNuke}>
                            NUKE (Delete All)
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default HiddenModal;
