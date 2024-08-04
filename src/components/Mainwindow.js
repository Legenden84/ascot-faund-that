import React, { Component } from 'react';
import './Mainwindow.css';

class Mainwindow extends Component {
    render() {
        const { csvData } = this.props;
        const { fullData, filteredData } = csvData;

        if (!filteredData || filteredData.length === 0) {
            return <p>Loading...</p>;
        }

        // Extract headers from the filtered data
        const headers = Object.keys(filteredData[0]);

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
