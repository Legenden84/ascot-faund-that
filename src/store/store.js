import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { loadState, saveState, clearState } from './localStorage.js';
import rootReducer from './../reducers/index';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveState(store.getState());
});

if (persistedState === undefined) {
    clearState();
}

export default store;