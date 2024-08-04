import { connect } from 'react-redux';
import Mainwindow from '../components/Mainwindow';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData.filteredData,
});

export default connect(mapStateToProps)(Mainwindow);
