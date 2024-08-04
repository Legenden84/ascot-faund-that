import React, { Component } from 'react';
import './TopStatusBar.css';

class TopStatusBar extends Component {
    render() {
        return (
            <div className="StatusBar">
                <p>{this.props.status}</p>
            </div>
        );
    }
}

export default TopStatusBar;
