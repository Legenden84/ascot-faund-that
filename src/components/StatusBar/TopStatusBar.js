import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './TopStatusBar.css';

class TopStatusBar extends Component {
    state = {
        startDate: null,
        endDate: null,
        filterText: '',
    };

    handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        this.setState({ startDate: start, endDate: end }, this.dispatchDateRange);
    };

    handleFilterTextChange = (event) => {
        const text = event.target.value;
        this.setState({ filterText: text });
        this.props.setFilterText(text);
    };

    dispatchDateRange = () => {
        const { startDate, endDate } = this.state;
        this.props.setDateRange({ startDate, endDate });
    };

    render() {
        const { selectedRowsCount } = this.props;
        const { startDate, endDate, filterText } = this.state;

        return (
            <div className="StatusBar">
                <button className="ActionButton">
                    Select action ({selectedRowsCount})
                </button>
                <div className="DateRangePickerContainer">
                    <DatePicker
                        selected={startDate}
                        onChange={this.handleDateRangeChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        placeholderText="Select date range"
                        isClearable={true} /* Allows clearing the date range */
                    />
                </div>
                <input
                    type="text"
                    className="FilterTextInput"
                    placeholder="Enter filter text"
                    value={filterText}
                    onChange={this.handleFilterTextChange}
                />
            </div>
        );
    }
}

export default TopStatusBar;
