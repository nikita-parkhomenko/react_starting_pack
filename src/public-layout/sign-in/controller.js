
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { getSelfExecutor } from '../../controller';
import { WELCOME_SCREEN } from '../../constants/routes';
import { instanceAPI, instancePUB } from '../../services/request.service';

// configure
export const controller = create({
  prefix: 'sign-in',
  actions: {
    initialize: 'INITIALIZE',
    updateData: 'UPDATE_DATA'
  },
  initial: {
    disabled: false,
    initialValues: {},
    initialized: false,
    errorMessage: null,
  },
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
    yield takeEvery(controller.action.updateData.TYPE, updateDataSaga);
  }
});

export default controller;

function * initializeSaga ({ type, payload }) {
  // console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //   , '\n payload:', payload
  // );
  // NOTE do nothing
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * updateDataSaga ({ type, payload }) {
  // console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //   , '\n payload:', payload
  // );

  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: null }));
  try {
    // TODO implement
    const session = { access_token: 'JWT_access_token', refresh_token: 'JWT_refresh_token' };
    // const session = yield call(instancePUB, { data: payload, method: 'POST', url: '/auth/token' });
    yield call(instanceAPI.setupSession, session);
    yield call(getSelfExecutor);
    yield call(WELCOME_SCREEN.PUSH, {});
    yield call(toastr.success, 'Welcome', 'We pleasure to see you');
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield call(instanceAPI.setupSession, null);
    yield put(controller.action.updateCtrl({ errorMessage: message }));
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
