import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
    render() {
        return (
            <div className="StatusBar">
                <p>{this.props.status}</p>
            </div>
        );
    }
}

export default StatusBar;
