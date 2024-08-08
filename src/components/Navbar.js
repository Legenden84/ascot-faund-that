import React, { Component } from 'react';
import './Navbar.css';
import HiddenModalContainer from '../containers/HiddenModalContainer';

class NavbarComponent extends Component {
    state = {
        isModalOpen: false,
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen,
        }));
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    render() {
        const capitalizedFilter = this.capitalizeFirstLetter(this.props.filter);

        return (
            <nav className="Navbar">
                <h1>Faund That - {capitalizedFilter}</h1>
                <button
                    className="HiddenButton"
                    onClick={this.toggleModal}
                    style={{ opacity: 0 }}
                >

                </button>
                <HiddenModalContainer
                    isOpen={this.state.isModalOpen}
                    onClose={this.toggleModal}
                />
            </nav>
        );
    }
}

export default NavbarComponent;