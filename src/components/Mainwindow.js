import React, { Component } from 'react';
import StatusBar from './StatusBar';
import './Mainwindow.css';

class Mainwindow extends Component {
    render() {
        const { csvData } = this.props;

        // Debugging output
        console.log("csvData:", csvData);

        // Safeguard to ensure csvData is an array
        if (!Array.isArray(csvData)) {
            return <p>Data is not available or is in an incorrect format.</p>;
        }

        if (csvData.length === 0) {
            return <p>Loading...</p>;
        }

        // Filter out the 'deleted' and 'status' columns for display
        const filteredData = csvData.map(({ deleted, status, ...rest }) => rest);

        // Example logic for status message
        const statusMessage = `Loaded ${csvData.length} items, ${csvData.filter(row => row.deleted).length} deleted.`;

        // Extract headers from the filtered data
        const headers = Object.keys(filteredData[0]);

        return (
            <main className="MainWindow">
                <StatusBar status={statusMessage} />
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, cellIndex) => (
                                    <td key={cellIndex}>{row[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        );
    }
}

export default Mainwindow;
