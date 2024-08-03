import React, { Component } from 'react';
import NavbarContainer from './containers/NavbarContainer';
import SidepanelContainer from './containers/SidepanelContainer';
import MainWindowContainer from './containers/MainWindowContainer';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavbarContainer />
                <div className="App-body">
                    <SidepanelContainer />
                    <MainWindowContainer />
                </div>
            </div>
        );
    }
}

export default App;
