import { connect } from 'react-redux';
import NavbarComponent from '../components/Navbar';
import { nukeCsv } from '../actions/MainWindowActions';

const mapStateToProps = (state) => ({
    filter: state.sidepanel.filter,
});

const mapDispatchToProps = (dispatch) => ({
    nukeCsv: () => dispatch(nukeCsv()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
