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
        this.props.fetchCsv();
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

    handleContactedToggle = (originalRowIndex) => {
        const updatedData = [...this.props.csvData];
        updatedData[originalRowIndex].contacted = !updatedData[originalRowIndex].contacted;
        this.props.updateCsv(updatedData);
    };

    render() {
        const { csvData, filter, selectedRows, selectedRowsCount, setDateRange, setFilterText, deleteItems, restoreItems, setSelectedRows } = this.props;
        const { currentStartIndex, rowsPerPage } = this.state;

        if (!Array.isArray(csvData) || csvData.length === 0) {
            return <p>Data is not available or is in an incorrect format.</p>;
        }

        const filteredData = csvData
            .map((row, index) => ({ row, originalIndex: index }))
            .filter(({ row }) => (filter === 'active' ? !row.deleted : row.deleted));

        const rowsToDisplay = filteredData.slice(currentStartIndex, currentStartIndex + rowsPerPage);

        const rangeStart = currentStartIndex + 1;
        const rangeEnd = currentStartIndex + rowsToDisplay.length;
        const rangeText = `${rangeStart}-${rangeEnd} of ${filteredData.length}`;

        const headers = Object.keys(csvData[0]).filter(header => header !== 'deleted');

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
                                <tr key={rowIndex}>
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
                                            ) : (
                                                row[header]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <BottomStatusBar
                    onUpClick={this.handleUpClick}
                    onDownClick={this.handleDownClick}
                    disableUp={currentStartIndex === 0}
                    disableDown={currentStartIndex >= filteredData.length - rowsPerPage}
                    onRowsChange={this.handleRowsChange}
                    rowsPerPage={rowsPerPage}
                    rangeText={rangeText}
                />
            </main>
        );
    }
}

export default MainwindowComponent;