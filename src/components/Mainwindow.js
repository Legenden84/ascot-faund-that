import React, { Component } from 'react';
import TopStatusBar from './StatusBar/TopStatusBar';
import BottomStatusBar from './StatusBar/BottomStatusBar';
import './Mainwindow.css';

class MainwindowComponent extends Component {
    state = {
        currentStartIndex: 0,
        rowsPerPage: 10,
    };

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

    handleCheckboxChange = (row) => {
        const { selectedRows, setSelectedRows } = this.props;

        const updatedSelectedRows = selectedRows.includes(row)
            ? selectedRows.filter(selectedRow => selectedRow !== row)
            : [...selectedRows, row];

        setSelectedRows(updatedSelectedRows);  // Dispatch the updated selected rows to the Redux store
    };

    render() {
        const { csvData, filter, selectedRows } = this.props;
        const { currentStartIndex, rowsPerPage } = this.state;

        if (!Array.isArray(csvData) || csvData.length === 0) {
            return <p>Data is not available or is in an incorrect format.</p>;
        }

        const filteredData = filter === 'active'
            ? csvData.filter(row => !row.deleted)
            : csvData.filter(row => row.deleted);

        const rowsToDisplay = filteredData.slice(currentStartIndex, currentStartIndex + rowsPerPage);

        const statusMessage = `Displaying rows ${currentStartIndex + 1} to ${
            currentStartIndex + rowsToDisplay.length
        } of ${filteredData.length} total items`;

        const rangeStart = currentStartIndex + 1;
        const rangeEnd = currentStartIndex + rowsToDisplay.length;
        const rangeText = `${rangeStart}-${rangeEnd} of ${filteredData.length}`;

        const headers = Object.keys(csvData[0]).filter(header => header !== 'deleted');

        return (
            <main className="MainWindow">
                <TopStatusBar status={statusMessage} />
                <div className="TableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th className="CheckboxHeader"></th> {/* Header for checkboxes */}
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
                                            onChange={() => this.handleCheckboxChange(row)}
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
