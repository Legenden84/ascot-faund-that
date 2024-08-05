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

const mapStateToProps = (state) => ({
    csvData: state.mainWindow.csvData,
    filter: state.sidepanel.filter,
    selectedRows: state.mainWindow.selectedRows,
    selectedRowsCount: state.mainWindow.selectedRows.length,
    dateRange: state.mainWindow.dateRange,
    filterText: state.mainWindow.filterText,
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedRows: (selectedRows) => dispatch(setSelectedRows(selectedRows)),
    setDateRange: (dateRange) => dispatch(setDateRange(dateRange)),
    setFilterText: (text) => dispatch(setFilterText(text)),
    deleteItems: () => dispatch(deleteItems()),
    restoreItems: () => dispatch(restoreItems()),
    fetchCsv: () => dispatch(fetchCsv()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainwindowComponent);