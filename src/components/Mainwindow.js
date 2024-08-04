import React, { Component } from 'react';
import TopStatusBar from './StatusBar/TopStatusBar';
import BottomStatusBar from './StatusBar/BottomStatusBar';
import './Mainwindow.css';

class Mainwindow extends Component {
    state = {
        currentStartIndex: 0,  // Index of the first row to display
        rowsPerPage: 10,       // Default number of rows per page
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
        const { currentStartIndex, rowsPerPage } = this.state;

        if (!Array.isArray(csvData) || csvData.length === 0) {
            return <p>Data is not available or is in an incorrect format.</p>;
        }

        // Determine the rows to display
        const rowsToDisplay = csvData.slice(currentStartIndex, currentStartIndex + rowsPerPage);

        // Example logic for status message
        const statusMessage = `Displaying rows ${currentStartIndex + 1} to ${
            currentStartIndex + rowsToDisplay.length
        } of ${csvData.length} total items`;

        // Calculate the range text for the BottomStatusBar
        const rangeStart = currentStartIndex + 1;
        const rangeEnd = currentStartIndex + rowsToDisplay.length;
        const rangeText = `${rangeStart}-${rangeEnd} of ${csvData.length}`;

        // Extract headers from the data
        const headers = Object.keys(csvData[0]);

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
                    disableDown={currentStartIndex >= csvData.length - rowsPerPage}
                    onRowsChange={this.handleRowsChange}
                    rowsPerPage={rowsPerPage}
                    rangeText={rangeText}  // Pass the range text to the BottomStatusBar
                />
            </main>
        );
    }
}

export default Mainwindow;
