import React, { Component } from 'react';
import './Navbar.css';

class NavbarComponent extends Component {
    handleNuke = () => {
        if (window.confirm("Are you sure you want to delete all rows? This action cannot be undone.")) {
            this.props.nukeCsv();
        }
    };

    render() {
        const { filter } = this.props;

        return (
            <nav className="Navbar">
                <h1>Faund That - {filter}</h1>
                {process.env.REACT_APP_MACHINE === 'origin' && (
                    <button className="NukeButton" onClick={this.handleNuke}>
                        NUKE (Delete All)
                    </button>
                )}
            </nav>
        );
    }
}

export default NavbarComponent;
