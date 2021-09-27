
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import SweetAlert from '../../../services/swal.service';
import { instanceAPI } from '../../../services/request.service';

// configure
export const propertiesListCtrl = create({
  prefix: 'properties-list',
  actions: {
    initialize: 'INITIALIZE',
    deleteItem: 'DELETE_ITEM',
  },
  initial: {
    properties: [],
    disabled: false,
    initialized: false,
    errorMessage: null,
  },
  subscriber: function * () {
    yield takeEvery(propertiesListCtrl.action.initialize.TYPE, initializeSaga);
    yield takeEvery(propertiesListCtrl.action.deleteItem.TYPE, deleteItemSaga);
  }
});

export default propertiesListCtrl;

function * initializeSaga () {
  yield put(propertiesListCtrl.action.clearCtrl());
  yield call(filterPropertiesSaga);
  yield put(propertiesListCtrl.action.updateCtrl({ initialized: true }));
}

function * filterPropertiesSaga () {
  yield put(propertiesListCtrl.action.updateCtrl({ disabled: true }));
  try {
    // TODO implement get properties request
    const properties = yield call(instanceAPI, { method: 'GET', url: '/users' });
    yield put(propertiesListCtrl.action.updateCtrl({ properties }));
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield put(propertiesListCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(propertiesListCtrl.action.updateCtrl({ disabled: false }));
}

function * deleteItemSaga ({ type, payload }) {
  const { id } = payload;
  const confirmation = yield call(SweetAlert.confirm, {
    title: `Do you want to delete property with id: ${id}?`
  });
  if (!confirmation.value) { return; }
  yield put(propertiesListCtrl.action.updateCtrl({ disabled: true }));
  try {
    // TODO implement delete property request
    yield call(instanceAPI, { method: 'DELETE', url: `/users/${id}` });
    yield call(filterPropertiesSaga);
    yield call(SweetAlert.success, { title: 'Property Successfully deleted!' });
  } catch ({ message }) {
    yield call(SweetAlert.error, { title: message });
  }
  yield put(propertiesListCtrl.action.updateCtrl({ disabled: false }));
}
