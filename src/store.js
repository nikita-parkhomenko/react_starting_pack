
// outsource dependencies
import { fork } from 'redux-saga/effects';
import { reducer as form } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { reducer as toastr } from 'react-redux-toastr';
import { reducer, sagas, path } from 'redux-saga-controller';
import { createBrowserHistory as createHistory } from 'history';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// local dependencies
import config from './constants';
import { reducer as modal } from './components/redux-modal';

// export history outside of components to be able dispatch navigation actions from anywhere!
export const history = createHistory();

// Build the middleware to run our Saga
const sagaMiddleware = createSagaMiddleware();

// Apply redux extension compose for non production environment
const enchantedCompose = config.production ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

// Create store outside of root to be able dispatch actions from anywhere!
export const store = createStore(
  combineReducers({
    [path]: reducer,
    toastr,
    modal,
    form,
  }),
  enchantedCompose(applyMiddleware(sagaMiddleware))
);

// initialize application sagas
sagaMiddleware.run(function * () {
  yield fork(sagas);
});

// Export
export default store;
