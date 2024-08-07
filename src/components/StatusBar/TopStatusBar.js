import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './TopStatusBar.css';
import NewItemModalContainer from '../../containers/NewItemModalContainer';

class TopStatusBar extends Component {
    state = {
        startDate: null,
        endDate: null,
        filterText: '',
        dropdownOpen: false,
        isModalOpen: false,
    };

    handleDateRangeChange = (dates) => {
        const [start, end] = dates;
        this.setState({ startDate: start, endDate: end });
        this.props.setDateRange({ startDate: start, endDate: end });
    };

    handleFilterTextChange = (event) => {
        const text = event.target.value;
        this.setState({ filterText: text });
        this.props.setFilterText(text);
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    handleAction = (actionType) => {
        if (actionType === 'delete') {
            this.props.deleteItems();
            this.props.setSelectedRows([]);
        } else if (actionType === 'restore') {
            this.props.restoreItems();
            this.props.setSelectedRows([]);
        }
        this.setState({ dropdownOpen: false });
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen,
        }));
    };

    render() {
        const { selectedRowsCount, filter } = this.props;
        const { startDate, endDate, filterText, dropdownOpen, isModalOpen } = this.state;

        return (
            <div className="StatusBar">
                <div className="ActionButtonContainer">
                    <button className="ActionButton" onClick={this.toggleDropdown}>
                        Select action ({selectedRowsCount})
                    </button>
                    <button className="ActionButton" onClick={this.toggleModal}>
                        New Item
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
                <div className="FilterContainer">
                    <DatePicker
                        selected={startDate}
                        onChange={this.handleDateRangeChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        placeholderText="Select date range"
                        isClearable={true}
                    />
                    <input
                        type="text"
                        className="FilterTextInput"
                        placeholder="Enter filter text"
                        value={filterText}
                        onChange={this.handleFilterTextChange}
                    />
                </div>
                <NewItemModalContainer isOpen={isModalOpen} onClose={this.toggleModal} />
            </div>
        );
    }
}

export default TopStatusBar;
