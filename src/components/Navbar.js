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

    render() {
        return (
            <nav className="Navbar">
                <h1>Faund That - {this.props.filter}</h1>
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
