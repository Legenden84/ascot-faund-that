import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './TopStatusBar.css';

class TopStatusBar extends Component {
    state = {
        startDate: null,
        endDate: null,
        filterText: '',
        dropdownOpen: false, // State to manage dropdown visibility
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

    toggleDropdown = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen, // Toggle dropdown visibility
        }));
    };

    handleAction = (action) => {
        this.setState({ dropdownOpen: false }); // Close the dropdown after selection
        console.log(`Selected action: ${action}`);
        // Implement the logic for delete/restore actions here
    };

    render() {
        const { selectedRowsCount } = this.props;
        const { startDate, endDate, filterText, dropdownOpen } = this.state;

        return (
            <div className="StatusBar">
                <div className="ActionButtonContainer">
                    <button className="ActionButton" onClick={this.toggleDropdown}>
                        Select action ({selectedRowsCount})
                    </button>
                    {dropdownOpen && (
                        <ul className="DropdownMenu">
                            <li onClick={() => this.handleAction('delete')}>Delete Item(s)</li>
                            <li onClick={() => this.handleAction('restore')}>Restore Item(s)</li>
                        </ul>
                    )}
                </div>
                <div className="DateRangePickerContainer">
                    <DatePicker
                        selected={startDate}
                        onChange={this.handleDateRangeChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        placeholderText="Select date range"
                        isClearable={true}
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
