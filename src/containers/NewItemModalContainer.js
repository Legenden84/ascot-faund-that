import { connect } from 'react-redux';
import NewItemModal from '../components/StatusBar/NewItemModal';
import { addNewRowToCsv, updateRowInCsv } from '../actions/AwsActions';

const mapStateToProps = (state) => ({
    csvData: state.aws.csvData,
});

const mapDispatchToProps = (dispatch) => ({
    addNewRowToCsv: (newRow) => dispatch(addNewRowToCsv(newRow)),
    updateRowInCsv: (updatedRow) => dispatch(updateRowInCsv(updatedRow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewItemModal);
