import { connect } from 'react-redux';
import MainwindowComponent from '../components/Mainwindow';
import {
    setSelectedRows,
    setDateRange,
    setFilterText,
} from '../actions/MainWindowActions';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData,
    filter: state.sidepanel.filter,
    selectedRows: state.mainWindow.selectedRows,
    selectedRowsCount: state.mainWindow.selectedRows.length,  // Pass the count of selected rows
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedRows: (selectedRows) => dispatch(setSelectedRows(selectedRows)),
    setDateRange: (dateRange) => dispatch(setDateRange(dateRange)),  // Dispatch date range
    setFilterText: (text) => dispatch(setFilterText(text)),  // Dispatch filter text
});

export default connect(mapStateToProps, mapDispatchToProps)(MainwindowComponent);
