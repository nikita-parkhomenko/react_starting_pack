
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay } from 'redux-saga/effects';

// local dependencies
import { SIGN_IN } from '../../constants/routes';
import { instancePUB } from '../../services/request.service';

// configure
export const controller = create({
  prefix: 'sign-up',
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
    yield call(instancePUB, { data: payload, method: 'POST', url: '/auth/token/sign-up' });
    yield call(toastr.success, 'Sign Up', 'Data was successfully sent');
    yield delay(2 * 1000);
    yield call(SIGN_IN.PUSH, {});
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield put(controller.action.updateCtrl({ errorMessage: message }));
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
