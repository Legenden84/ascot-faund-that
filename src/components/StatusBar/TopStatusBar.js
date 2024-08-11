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
        editRowData: null,
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
        }), () => {
            if (this.state.dropdownOpen) {
                document.addEventListener('mousedown', this.handleClickOutside);
            } else {
                document.removeEventListener('mousedown', this.handleClickOutside);
            }
        });
    };

    handleClickOutside = (event) => {
        if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
            this.setState({ dropdownOpen: false });
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    };

    handleAction = (actionType) => {
        const { selectedRows } = this.props;

        if (actionType === 'delete') {
            this.props.deleteItems();
            this.props.setSelectedRows([]);
        } else if (actionType === 'restore') {
            this.props.restoreItems();
            this.props.setSelectedRows([]);
        } else if (actionType === 'edit' && selectedRows.length === 1) {
            const selectedRow = selectedRows[0];
            this.setState({
                isModalOpen: true,
                editRowData: selectedRow,
            });
        }

        this.setState({ dropdownOpen: false });
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    toggleModal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen,
        }));
    };

    render() {
        const { selectedRowsCount, filter, selectedRows } = this.props;
        const { startDate, endDate, filterText, dropdownOpen, isModalOpen, editRowData } = this.state;

        return (
            <div className="StatusBar">
                <div className="ActionButtonContainer">
                    <button className="ActionButton" onClick={this.toggleDropdown}>
                        Select Action ({selectedRowsCount})
                    </button>
                    <button className="ActionButton" onClick={this.toggleModal}>
                        New Item
                    </button>
                    {dropdownOpen && (
                        <ul
                            className={`DropdownMenu ${dropdownOpen ? 'open' : ''}`}
                            ref={(element) => { this.dropdownMenu = element; }}
                        >
                            {filter === 'active' && (
                                <li onClick={() => this.handleAction('delete')}>Delete Item(s)</li>
                            )}
                            {filter === 'deleted' && (
                                <li onClick={() => this.handleAction('restore')}>Restore Item(s)</li>
                            )}
                            <li
                                style={{ opacity: selectedRows.length === 1 ? 1 : 0.5, cursor: selectedRows.length === 1 ? 'pointer' : 'not-allowed' }}
                                onClick={() => this.handleAction('edit')}
                            >
                                Edit Item
                            </li>
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
                <NewItemModalContainer
                    isOpen={isModalOpen}
                    onClose={this.toggleModal}
                    isEdit={!!editRowData}
                    rowId={editRowData?.ID}
                    room={editRowData?.room}
                    description={editRowData?.description}
                    code={editRowData?.["country-code"]}
                    phone={editRowData?.phone}
                    email={editRowData?.email}
                    contacted={editRowData?.contacted}
                />
            </div>
        );
    }
}

export default TopStatusBar;
