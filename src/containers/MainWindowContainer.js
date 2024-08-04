import { connect } from 'react-redux';
import MainwindowComponent from '../components/Mainwindow';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData,
    filter: state.sidepanel.filter,  // Get the current filter from the Redux store
});

export default connect(mapStateToProps)(MainwindowComponent);
