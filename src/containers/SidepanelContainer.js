import { connect } from 'react-redux';
import Sidepanel from '../components/Sidepanel';
import { setFilter } from '../actions/SidepanelActions';

const mapDispatchToProps = (dispatch) => ({
    setFilter: (filter) => {
        dispatch(setFilter(filter));
    },
});

export default connect(null, mapDispatchToProps)(Sidepanel);
