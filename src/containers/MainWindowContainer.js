import { connect } from 'react-redux';
import MainwindowComponent from '../components/Mainwindow';
import {
    setSelectedRows,
    setDateRange,
    setFilterText,
    deleteItems,
    restoreItems,
    updateCsv,
    removeOldDeletedRows,
    setTableOrder,
} from '../actions/MainWindowActions';
import { fetchCsv } from '../actions/AwsActions';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData,
    filter: state.sidepanel.filter,
    selectedRows: state.mainWindow.selectedRows,
    selectedRowsCount: state.mainWindow.selectedRows.length,
    dateRange: state.mainWindow.dateRange,
    filterText: state.mainWindow.filterText,
    tableOrder: state.mainWindow.tableOrder,
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedRows: (selectedRows) => dispatch(setSelectedRows(selectedRows)),
    setDateRange: (dateRange) => dispatch(setDateRange(dateRange)),
    setFilterText: (text) => dispatch(setFilterText(text)),
    deleteItems: () => dispatch(deleteItems()),
    restoreItems: () => dispatch(restoreItems()),
    fetchCsv: () => dispatch(fetchCsv()),
    updateCsv: (updatedData) => dispatch(updateCsv(updatedData)),
    removeOldDeletedRows: () => dispatch(removeOldDeletedRows()),
    setTableOrder: (order) => dispatch(setTableOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainwindowComponent);
