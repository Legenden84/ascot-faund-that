import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './TopStatusBar.css';

class TopStatusBar extends Component {
    state = {
        startDate: null,
        endDate: null,
        filterText: '',
        dropdownOpen: false,
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
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    handleAction = (action) => {
        this.setState({ dropdownOpen: false });

        if (action === 'delete') {
            this.props.deleteItems();
            this.props.setSelectedRows([]);
        } else if (action === 'restore') {
            this.props.restoreItems();
            this.props.setSelectedRows([]);
        }
    };

    render() {
        const { selectedRowsCount, filter } = this.props;
        const { startDate, endDate, filterText, dropdownOpen } = this.state;

        return (
            <div className="StatusBar">
                <div className="ActionButtonContainer">
                    <button className="ActionButton" onClick={this.toggleDropdown}>
                        Select action ({selectedRowsCount})
                    </button>
                    {dropdownOpen && (
                        <ul className="DropdownMenu">
                            {filter === 'active' && (
                                <li onClick={() => this.handleAction('delete')}>Delete Item(s)</li>
                            )}
                            {filter === 'deleted' && (
                                <li onClick={() => this.handleAction('restore')}>Restore Item(s)</li>
                            )}
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