import React, { Component } from 'react';
import TopStatusBar from './StatusBar/TopStatusBar';
import BottomStatusBar from './StatusBar/BottomStatusBar';
import './Mainwindow.css';

class MainwindowComponent extends Component {
    state = {
        currentStartIndex: 0,  // Index of the first row to display
        rowsPerPage: 10,       // Default number of rows per page
        showDeleted: false,    // Example configuration flag to show/hide deleted rows
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
            currentStartIndex: 0, // Reset to the first page when changing the number of rows
        });
    };

    render() {
        const { csvData } = this.props;
        const { currentStartIndex, rowsPerPage, showDeleted } = this.state;

        if (!Array.isArray(csvData) || csvData.length === 0) {
            return <p>Data is not available or is in an incorrect format.</p>;
        }

        // Apply filtering based on the configuration (e.g., whether to show deleted rows)
        const filteredData = showDeleted
            ? csvData
            : csvData.filter(row => !row.deleted);

        // Determine the rows to display after filtering
        const rowsToDisplay = filteredData.slice(currentStartIndex, currentStartIndex + rowsPerPage);

        // Example logic for status message
        const statusMessage = `Displaying rows ${currentStartIndex + 1} to ${
            currentStartIndex + rowsToDisplay.length
        } of ${filteredData.length} total items`;

        // Calculate the range text for the BottomStatusBar
        const rangeStart = currentStartIndex + 1;
        const rangeEnd = currentStartIndex + rowsToDisplay.length;
        const rangeText = `${rangeStart}-${rangeEnd} of ${filteredData.length}`;

        // Extract headers from the data, but exclude 'deleted' from the visible headers
        const headers = Object.keys(csvData[0]).filter(header => header !== 'deleted');

        return (
            <main className="MainWindow">
                <TopStatusBar status={statusMessage} />
                <div className="TableContainer">
                    <table>
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rowsToDisplay.map((row, rowIndex) => (
                                <tr key={rowIndex}>
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
                    rangeText={rangeText}  // Pass the range text to the BottomStatusBar
                />
            </main>
        );
    }
}

export default MainwindowComponent;
