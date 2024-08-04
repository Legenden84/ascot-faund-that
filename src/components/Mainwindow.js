// components/Mainwindow.js
import React, { Component } from 'react';
import './Mainwindow.css';

class Mainwindow extends Component {
    render() {
        const { csvData } = this.props;

        // Check if csvData exists and is not empty
        if (!csvData || csvData.length === 0) {
            return <p>Loading...</p>;
        }

        // Extract the headers from the first row of data
        const headers = Object.keys(csvData[0]);

        return (
            <main className="MainWindow">
                <h2>Main Window</h2>
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, rowIndex) => (
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
