import { connect } from 'react-redux';
import HiddenModal from '../components/StatusBar/HiddenModal';
import { nukeCsv, updateCsv } from '../actions/MainWindowActions';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData,
});

const mapDispatchToProps = (dispatch) => ({
    nukeCsv: () => dispatch(nukeCsv()),
    updateCsv: (data) => dispatch(updateCsv(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HiddenModal);