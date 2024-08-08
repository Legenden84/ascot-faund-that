import React, { Component } from 'react';
import TopStatusBar from './StatusBar/TopStatusBar';
import BottomStatusBar from './StatusBar/BottomStatusBar';
import './Mainwindow.css';

class MainwindowComponent extends Component {
    state = {
        currentStartIndex: 0,
        rowsPerPage: 10,
    };

    componentDidMount() {
        this.props.fetchCsv().then(() => {
            this.props.removeOldDeletedRows();
        });
    }

    handleUpClick = () => {
        this.setState((prevState) => ({
            currentStartIndex: Math.max(prevState.currentStartIndex - prevState.rowsPerPage, 0),
        }));
    };

    handleDownClick = () => {
        const { csvData } = this.props;
        this.setState((prevState) => ({
            currentStartIndex: Math.min(
                prevState.currentStartIndex + prevState.rowsPerPage,
                csvData.length - prevState.rowsPerPage
            ),
        }));
    };

    handleRowsChange = (rowsPerPage) => {
        this.setState({
            rowsPerPage,
            currentStartIndex: 0,
        });
    };

    handleOrderChange = (order) => {
        this.props.setTableOrder(order);
    };

    handleContactedToggle = (originalRowIndex) => {
        const updatedData = [...this.props.csvData];
        updatedData[originalRowIndex].contacted = !updatedData[originalRowIndex].contacted;
        this.props.updateCsv(updatedData);
    };

    sortData = (data) => {
        const { tableOrder } = this.props;

        return data.sort((a, b) => {
            if (tableOrder === 'ascending') {
                return a.ID.localeCompare(b.ID);
            } else {
                return b.ID.localeCompare(a.ID);
            }
        });
    };

    escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    render() {
        const { csvData, filter, selectedRows, selectedRowsCount, setDateRange, setFilterText, deleteItems, restoreItems, setSelectedRows, dateRange, filterText, tableOrder } = this.props;
        const { currentStartIndex, rowsPerPage } = this.state;

        const startDate = dateRange.startDate ? new Date(dateRange.startDate) : null;
        const endDate = dateRange.endDate ? new Date(dateRange.endDate) : null;

        const escapedFilterText = this.escapeRegExp(filterText);
        const regex = new RegExp(escapedFilterText, 'i');

        let filteredData = [];
        if (Array.isArray(csvData) && csvData.length > 0) {
            filteredData = this.sortData(csvData) // Sort the data before filtering
                .map((row, index) => ({ row, originalIndex: index }))
                .filter(({ row }) => {
                    const rowDate = new Date(row.created);
                    const withinDateRange = (!startDate || rowDate >= startDate) && (!endDate || rowDate <= endDate);

                    const concatenatedColumns = Object.keys(row)
                        .filter(key => key !== 'deleted' && key !== 'status')
                        .map(key => {
                            const cellValue = row[key];
                            return typeof cellValue === 'string' ? cellValue.replace(/^0x/, '') : cellValue;
                        })
                        .join(' ');

                    const matchesFilterText = regex.test(concatenatedColumns);

                    return withinDateRange && matchesFilterText;
                })
                .filter(({ row }) => (filter === 'active' ? !row.deleted : row.deleted));
        }

        const rowsToDisplay = filteredData.slice(currentStartIndex, currentStartIndex + rowsPerPage);

        const rangeStart = currentStartIndex + 1;
        const rangeEnd = currentStartIndex + rowsToDisplay.length;
        const rangeText = `${rangeStart}-${rangeEnd} of ${filteredData.length}`;

        const headers = csvData.length > 0 ? Object.keys(csvData[0]).filter(header => header !== 'deleted' && header !== 'status') : [];

        return (
            <main className="MainWindow">
                <TopStatusBar
                    selectedRowsCount={selectedRowsCount}
                    setDateRange={setDateRange}
                    setFilterText={setFilterText}
                    deleteItems={deleteItems}
                    restoreItems={restoreItems}
                    filter={filter}
                    setSelectedRows={setSelectedRows}
                />
                <div className="TableContainer">
                    {filteredData.length === 0 ? (
                        <p>Data is not available or is in an incorrect format.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th className="CheckboxHeader"></th>
                                    {headers.map((header, index) => (
                                        <th key={index}>
                                            {header === 'country-code'
                                                ? 'Code'
                                                : header.charAt(0).toUpperCase() + header.slice(1)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rowsToDisplay.map(({ row, originalIndex }, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className={selectedRows.includes(row) ? 'selected-row' : ''}
                                    >
                                        <td className="CheckboxColumn">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row)}
                                                onChange={() => setSelectedRows(
                                                    selectedRows.includes(row)
                                                        ? selectedRows.filter(selectedRow => selectedRow !== row)
                                                        : [...selectedRows, row]
                                                )}
                                            />
                                        </td>
                                        {headers.map((header, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                className={
                                                    header === 'description' ? 'DescriptionColumn' : ''
                                                }
                                            >
                                                {header === 'ID' && row[header] ? (
                                                    row[header].replace(/^0x/, '')
                                                ) : header === 'contacted' ? (
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={row[header] || false}
                                                            onChange={() => this.handleContactedToggle(originalIndex)}
                                                        />
                                                        <span className="slider"></span>
                                                    </label>
                                                ) : typeof row[header] === 'string' ? (
                                                    row[header]
                                                ) : (
                                                    row[header]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <BottomStatusBar
                    onUpClick={this.handleUpClick}
                    onDownClick={this.handleDownClick}
                    onFirstClick={() => this.setState({ currentStartIndex: 0 })}
                    onLastClick={() => this.setState({ currentStartIndex: Math.max(filteredData.length - rowsPerPage, 0) })}
                    disableUp={currentStartIndex === 0}
                    disableDown={currentStartIndex >= filteredData.length - rowsPerPage}
                    disableFirst={currentStartIndex === 0}
                    disableLast={currentStartIndex >= filteredData.length - rowsPerPage}
                    rowsPerPage={rowsPerPage}
                    rangeText={rangeText}
                    onRowsChange={this.handleRowsChange}
                    tableOrder={tableOrder}
                    onOrderChange={this.handleOrderChange}
                />
            </main>
        );
    }
}

export default MainwindowComponent;
