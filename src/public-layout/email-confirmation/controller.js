
// outsource dependencies
import { create } from 'redux-saga-controller';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { instancePUB } from '../../services/request.service';

// configure
export const controller = create({
  prefix: 'sign-in',
  actions: {
    initialize: 'INITIALIZE',
  },
  initial: {
    disabled: false,
    initialized: false,
    errorMessage: null,
    isTokenValid: false,
  },
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
  }
});

export default controller;

function * initializeSaga ({ type, payload }) {
  // console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //   , '\n payload:', payload
  // );
  let isTokenValid;
  try {
    yield call(instancePUB, { method: 'POST', url: '/auth/token/confirmation', data: payload });
    isTokenValid = true;
  } catch ({ message }) {
    isTokenValid = false;
  }
  // NOTE do nothing
  yield put(controller.action.updateCtrl({ initialized: true, isTokenValid }));
}
