import { connect } from 'react-redux';
import MainwindowComponent from '../components/Mainwindow';
import { setSelectedRows } from '../actions/MainWindowActions';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData, // Fetching csvData from awsReducer
    filter: state.sidepanel.filter,
    selectedRows: state.mainWindow.selectedRows, // Fetching selected rows from MainWindowReducer
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedRows: (selectedRows) => dispatch(setSelectedRows(selectedRows)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainwindowComponent);
