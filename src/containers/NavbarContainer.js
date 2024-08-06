import { connect } from 'react-redux';
import NavbarComponent from '../components/Navbar';

const mapStateToProps = (state) => ({
    filter: state.sidepanel.filter,
});

export default connect(mapStateToProps)(NavbarComponent);
