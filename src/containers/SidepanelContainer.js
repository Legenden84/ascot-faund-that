import { connect } from 'react-redux';
import Sidepanel from '../components/Sidepanel';
import { setFilter } from '../actions/SidepanelActions';
import { setSelectedRows } from '../actions/MainWindowActions';

const mapDispatchToProps = (dispatch) => ({
    setFilter: (filter) => {
        dispatch(setFilter(filter));
    },
    setSelectedRows: (rows) => {
        dispatch(setSelectedRows(rows));
    },
});

export default connect(null, mapDispatchToProps)(Sidepanel);
