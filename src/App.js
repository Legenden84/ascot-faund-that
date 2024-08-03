import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavbarContainer from './containers/NavbarContainer';
import SidepanelContainer from './containers/SidepanelContainer';
import MainWindowContainer from './containers/MainWindowContainer';
import { fetchCsv } from './actions/AwsActions';
import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.fetchCsv();
    }

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

const mapDispatchToProps = (dispatch) => ({
    fetchCsv: () => dispatch(fetchCsv()),
});

export default connect(null, mapDispatchToProps)(App);