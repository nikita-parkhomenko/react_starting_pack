
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay } from 'redux-saga/effects';

// local dependencies
import { instanceAPI } from '../../../services/request.service';

// configure
export const userEditModalCtrl = create({
  prefix: 'user-edit-modal',
  actions: {
    apply: 'APPLY',
    dismiss: 'DISMISS',
    initialize: 'INITIALIZE',
    // NOTE Helper actions to handle from outer components
    close: 'CLOSE',
    closeReject: 'CLOSE_REJECT',
    closeResolve: 'CLOSE_RESOLVE',
  },
  initial: {
    show: false,
    disabled: false,
    initialized: false,
    errorMessage: null,
    initialValues: {},
  },
  subscriber: function * () {
    yield takeEvery(userEditModalCtrl.action.apply.TYPE, applySaga);
    yield takeEvery(userEditModalCtrl.action.dismiss.TYPE, dismissSaga);
    yield takeEvery(userEditModalCtrl.action.initialize.TYPE, initializeSaga);
  }
});

export default userEditModalCtrl;

function * initializeSaga ({ type, payload }) {
  try {
    const { id } = payload;
    // TODO implement get user by id
    const user = yield call(instanceAPI, { method: 'GET', url: `/users/${id}` });
    // NOTE show modal & setup options
    yield put(userEditModalCtrl.action.updateCtrl({ initialValues: user, show: true }));
    // NOTE initial request
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
  }
  yield put(userEditModalCtrl.action.updateCtrl({ initialized: true }));
}

function * applySaga ({ type, payload }) {
  yield put(userEditModalCtrl.action.updateCtrl({ disabled: true }));
  try {
    // TODO implement put method
    yield call(instanceAPI, { method: 'PUT', url: `/users/${payload.id}`, data: payload.user });
    yield call(toastr.success, 'User', 'User was successfully updataed');
    yield put(userEditModalCtrl.action.closeResolve());
    yield call(closeModalSaga);
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield put(userEditModalCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(userEditModalCtrl.action.updateCtrl({ disabled: false }));
}

function * dismissSaga () {
  yield put(userEditModalCtrl.action.closeReject());
  yield call(closeModalSaga);
}

function * closeModalSaga () {
  yield put(userEditModalCtrl.action.close());
  yield put(userEditModalCtrl.action.updateCtrl({ show: false }));
  yield delay(0.3 * 1000); // NOTE give chance to animation
  yield put(userEditModalCtrl.action.clearCtrl());
}
