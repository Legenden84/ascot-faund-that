import React, { Component } from 'react';
import TopStatusBar from './StatusBar/TopStatusBar';
import BottomStatusBar from './StatusBar/BottomStatusBar';
import './Mainwindow.css';

class Mainwindow extends Component {
    state = {
        currentStartIndex: 0,  // Index of the first row to display
    };

    handleUpClick = () => {
        this.setState((prevState) => ({
            currentStartIndex: Math.max(prevState.currentStartIndex - 10, 0),
        }));
    };

    handleDownClick = () => {
        const { csvData } = this.props;
        this.setState((prevState) => ({
            currentStartIndex: Math.min(prevState.currentStartIndex + 10, csvData.length - 10),
        }));
    };

    render() {
        const { csvData } = this.props;
        const { currentStartIndex } = this.state;

        if (!Array.isArray(csvData) || csvData.length === 0) {
            return <p>Data is not available or is in an incorrect format.</p>;
        }

        // Determine the rows to display
        const rowsToDisplay = csvData.slice(currentStartIndex, currentStartIndex + 10);

        // Example logic for status message
        const statusMessage = `Displaying rows ${currentStartIndex + 1} to ${currentStartIndex + rowsToDisplay.length} of ${csvData.length} total items`;

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
                    disableDown={currentStartIndex >= csvData.length - 10}
                />
            </main>
        );
    }
}

export default Mainwindow;
