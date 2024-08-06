import React, { Component } from 'react';
import './Navbar.css';

class NavbarComponent extends Component {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    render() {
        const { filter } = this.props;
        return (
            <nav className="Navbar">
                <h1>Faund That - {this.capitalizeFirstLetter(filter)}</h1>
            </nav>
        );
    }
}


export default NavbarComponent;
