import { connect } from 'react-redux';
import HiddenModal from '../components/StatusBar/HiddenModal';
import { nukeCsv } from '../actions/MainWindowActions';

const mapDispatchToProps = (dispatch) => ({
    nukeCsv: () => dispatch(nukeCsv()),
});

export default connect(null, mapDispatchToProps)(HiddenModal);
