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
        this.props.fetchCsv();  // Fetch CSV data when the component mounts
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

    render() {
        const { csvData, filter, selectedRows, selectedRowsCount, setDateRange, setFilterText, deleteItems, restoreItems } = this.props;
        const { currentStartIndex, rowsPerPage } = this.state;

        if (!Array.isArray(csvData) || csvData.length === 0) {
            return <p>Data is not available or is in an incorrect format.</p>;
        }

        const filteredData = filter === 'active'
            ? csvData.filter(row => !row.deleted)
            : csvData.filter(row => row.deleted);

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
                />
                <div className="TableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th className="CheckboxHeader">Select</th>
                                {headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rowsToDisplay.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="CheckboxColumn">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(row)}
                                            onChange={() => this.props.setSelectedRows(
                                                selectedRows.includes(row)
                                                    ? selectedRows.filter(selectedRow => selectedRow !== row)
                                                    : [...selectedRows, row]
                                            )}
                                        />
                                    </td>
                                    {headers.map((header, cellIndex) => (
                                        <td key={cellIndex}>{row[header]}</td>
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
