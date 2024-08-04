import { connect } from 'react-redux';
import Mainwindow from '../components/Mainwindow';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData,
});


const mapDispatchToProps = (dispatch) => ({
    // Map dispatch to props if needed
});

export default connect(mapStateToProps, mapDispatchToProps)(Mainwindow);
