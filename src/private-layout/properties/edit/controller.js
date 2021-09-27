
// outsource dependencies
import { create } from 'redux-saga-controller';
import { toastr } from 'react-redux-toastr';
import { call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { NEW_ID } from '../../../constants/spec';
import { PROPERTIES_LIST } from '../../../constants/routes';
import { instanceAPI } from '../../../services/request.service';

// configure
export const propertiesEditCtrl = create({
  prefix: 'properties-edit',
  actions: {
    initialize: 'INITIALIZE',
    updateData: 'UPDATE_DATA',
  },
  initial: {
    disabled: false,
    initialized: false,
    errorMessage: null,
    initialValues: {},
  },
  subscriber: function * () {
    yield takeEvery(propertiesEditCtrl.action.initialize.TYPE, initializeSaga);
    yield takeEvery(propertiesEditCtrl.action.updateData.TYPE, updateDataSaga);
  }
});

export default propertiesEditCtrl;


function * initializeSaga ({ type, payload }) {
  yield put(propertiesEditCtrl.action.clearCtrl());
  try {
    const { id } = payload;
    if (id !== NEW_ID) {
      // TODO implement get property by id
      const initialValues = yield call(instanceAPI, { method: 'GET', url: `/users/${id}` });
      yield put(propertiesEditCtrl.action.updateCtrl({ initialValues }));
    }
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield put(propertiesEditCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(propertiesEditCtrl.action.updateCtrl({ initialized: true }));
}

function * updateDataSaga ({ type, payload }) {
  yield put(propertiesEditCtrl.action.updateCtrl({ disabled: true }));
  try {
    // TODO implement put method
    yield call(instanceAPI, { method: 'PUT', url: `/users/${payload.id}`, data: payload });
    yield call(toastr.success, 'User', 'User was successfully updataed');
    yield call(PROPERTIES_LIST.PUSH, {});
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield put(propertiesEditCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(propertiesEditCtrl.action.updateCtrl({ disabled: false }));
}
