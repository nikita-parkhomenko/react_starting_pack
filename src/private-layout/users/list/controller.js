
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import SweetAlert from '../../../services/swal.service';
import { userEditModalCtrl } from '../edit-modal/controller';
import { instanceAPI } from '../../../services/request.service';

// configure
export const usersListCtrl = create({
  prefix: 'users-list',
  actions: {
    initialize: 'INITIALIZE',
    deleteItem: 'DELETE_ITEM',
  },
  initial: {
    users: [],
    disabled: false,
    initialized: false,
    errorMessage: null,
  },
  subscriber: function * () {
    yield takeEvery(usersListCtrl.action.initialize.TYPE, initializeSaga);
    yield takeEvery(usersListCtrl.action.deleteItem.TYPE, deleteItemSaga);
    // NOTE handle actions from user edit
    yield takeEvery(userEditModalCtrl.action.closeResolve.TYPE, filterUsersSaga);
  }
});

export default usersListCtrl;

function * initializeSaga () {
  yield put(usersListCtrl.action.clearCtrl());
  yield call(filterUsersSaga);
  yield put(usersListCtrl.action.updateCtrl({ initialized: true }));
}

function * filterUsersSaga () {
  yield put(usersListCtrl.action.updateCtrl({ disabled: true }));
  try {
    // TODO implement get users request
    const users = yield call(instanceAPI, { method: 'GET', url: '/users' });
    yield put(usersListCtrl.action.updateCtrl({ users }));
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield put(usersListCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(usersListCtrl.action.updateCtrl({ disabled: false }));
}

function * deleteItemSaga ({ type, payload }) {
  const { id } = payload;
  const confirmation = yield call(SweetAlert.confirm, {
    title: `Do you want to delete user with id: ${id}?`
  });
  if (!confirmation.value) { return; }
  yield put(usersListCtrl.action.updateCtrl({ disabled: true }));
  try {
    // TODO implement delete property request
    yield call(instanceAPI, { method: 'DELETE', url: `/users/${id}` });
    yield call(filterUsersSaga);
    yield call(SweetAlert.success, { title: 'User successfully deleted!' });
  } catch ({ message }) {
    yield call(SweetAlert.error, { title: message });
  }
  yield put(usersListCtrl.action.updateCtrl({ disabled: false }));
}
