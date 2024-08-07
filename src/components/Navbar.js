import React, { Component } from 'react';
import './Navbar.css';

class NavbarComponent extends Component {
    handleNuke = () => {
        if (window.confirm("Are you sure you want to delete all rows? This action cannot be undone.")) {
            this.props.nukeCsv();
        }
    };

    render() {
        const machineEnv = process.env.REACT_APP_MACHINE || 'remote';

        return (
            <nav className="Navbar">
                <h1>Faund That - {this.props.filter}</h1>
                {machineEnv === 'origin' && (
                    <div className="admin-buttons">
                        <button className="NukeButton" onClick={this.handleNuke}>
                            NUKE (Delete All)
                        </button>
                    </div>
                )}
            </nav>
        );
    }
}

export default NavbarComponent;
