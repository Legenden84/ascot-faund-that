import { connect } from 'react-redux';
import MainwindowComponent from '../components/Mainwindow';
import {
    setSelectedRows,
    setDateRange,
    setFilterText,
    deleteItems,
    restoreItems,
    fetchCsv,
} from '../actions/MainWindowActions';

// Map the necessary state to props
const mapStateToProps = (state) => ({
    csvData: state.mainWindow.csvData,
    filter: state.sidepanel.filter,  // Ensure filter is passed as a prop
    selectedRows: state.mainWindow.selectedRows,
    selectedRowsCount: state.mainWindow.selectedRows.length,  // Pass the count of selected rows
    dateRange: state.mainWindow.dateRange,
    filterText: state.mainWindow.filterText,
});

// Map the necessary actions to props
const mapDispatchToProps = (dispatch) => ({
    setSelectedRows: (selectedRows) => dispatch(setSelectedRows(selectedRows)),
    setDateRange: (dateRange) => dispatch(setDateRange(dateRange)),
    setFilterText: (text) => dispatch(setFilterText(text)),
    deleteItems: () => dispatch(deleteItems()),
    restoreItems: () => dispatch(restoreItems()),
    fetchCsv: () => dispatch(fetchCsv()),  // Fetch CSV data from S3
});

export default connect(mapStateToProps, mapDispatchToProps)(MainwindowComponent);
