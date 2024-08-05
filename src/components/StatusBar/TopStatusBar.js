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

    handleStartDateChange = (date) => {
        this.setState({ startDate: date }, this.dispatchDateRange);
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date }, this.dispatchDateRange);
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
                <div className="DatePickerContainer">
                    <DatePicker
                        selected={startDate}
                        onChange={this.handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Start date"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={this.handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="End date"
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
