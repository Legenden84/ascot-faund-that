import React, { Component } from 'react';
import './BottomStatusBar.css';

class BottomStatusBar extends Component {
    handleRowsChange = (event) => {
        this.props.onRowsChange(Number(event.target.value));
    };

    render() {
        const { onUpClick, onDownClick, disableUp, disableDown, rowsPerPage, rangeText } = this.props;

        return (
            <div className="BottomStatusBar">
                <div className="RowsSelector">
                    <label htmlFor="rowsPerPage">Rows per page:</label>
                    <select id="rowsPerPage" value={rowsPerPage} onChange={this.handleRowsChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="RangeText">
                    <p>{rangeText}</p>
                </div>
                <div className="NavigationButtons">
                    <button onClick={onUpClick} disabled={disableUp}>
                        &lt;
                    </button>
                    <button onClick={onDownClick} disabled={disableDown}>
                        &gt;
                    </button>
                </div>
            </div>
        );
    }
}

export default BottomStatusBar;