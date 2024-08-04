// components/StatusBar/BottomStatusBar.js
import React, { Component } from 'react';
import './BottomStatusBar.css'; // Updated to reflect the same directory

class BottomStatusBar extends Component {
    render() {
        const { onUpClick, onDownClick, disableUp, disableDown } = this.props;

        return (
            <div className="BottomStatusBar">
                <button onClick={onUpClick} disabled={disableUp}>
                    Up
                </button>
                <button onClick={onDownClick} disabled={disableDown}>
                    Down
                </button>
            </div>
        );
    }
}

export default BottomStatusBar;
