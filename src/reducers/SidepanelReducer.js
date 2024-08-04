import { SET_FILTER } from '../actions/SidepanelActions';

const initialState = {
    filter: 'active',
};

const sidepanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload,
            };
        default:
            return state;
    }
};

export default sidepanelReducer;
