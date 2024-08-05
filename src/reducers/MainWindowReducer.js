import { SET_SELECTED_ROWS } from '../actions/MainWindowActions';

const initialState = {
    selectedRows: [],  // Manage selected rows here
};

const mainWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_ROWS:
            return {
                ...state,
                selectedRows: action.payload,
            };
        default:
            return state;
    }
};

export default mainWindowReducer;
