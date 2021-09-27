
// outsource dependencies
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay } from 'redux-saga/effects';

// local dependencies
import { store } from './store';
import { silence } from './runtime-error';
import { instanceAPI, instancePUB } from './services/request.service';

// configure
instanceAPI.onAuthFailApplicationAction = () => store.dispatch(controller.action.initialize());

const controller = create({
  prefix: 'app',
  actions: {
    initialize: 'INITIALIZE',
    signOut: 'SIGN_OUT',
    getSelf: 'GET_SELF',
  },
  initial: {
    initialized: false, // prevent redirect from page and show instead current page and it behavior - global preloader
    health: true,       // prevent redirect from page and show instead current page and it behavior - maintenance page
    user: null,         // logged user information
    roles: []
  },
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
    yield takeEvery(controller.action.signOut.TYPE, signOutSaga);
    yield takeEvery(controller.action.getSelf.TYPE, getSelfSaga);
  }
});

export default controller;

function * initializeSaga ({ type, payload }) {
  // yield put(controller.action.clearCtrl());
  // console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //     , '\n payload:', payload
  // );
  // NOTE check health of API
  try {
    const { status } = { status: 'UP', instancePUB };
    // const { status } = yield call(instancePUB, { method: 'GET', url: '/actuator/health' });
    // NOTE API may answer "DOWN" (not ready yet)
    if (status !== 'UP') { throw new Error('API down for maintenance'); }
    yield put(controller.action.updateCtrl({ health: true }));
  } catch ({ message: error1 }) {
    yield put(controller.action.updateCtrl({ health: false }));
    // NOTE try again another time
    yield delay(10 * 1000);
    yield put(controller.action.initialize());
    return;
  }
  // NOTE try to restore user auth
  try {
    const hasSession = yield call(instanceAPI.restoreSessionFromStore);
    if (hasSession) { yield call(getSelfExecutor); }
  } catch ({ message: error2 }) {
    yield call(signOutSaga, {});
  }
  // NOTE initialization done
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * signOutSaga ({ type, payload }) {
  // console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //   , '\n payload:', payload
  // );
  // NOTE use silence helper if you dont want to handle error
  yield call(silence, instanceAPI, { method: 'POST', url: '/auth/logout' });
  // NOTE clear client side session from store
  yield call(instanceAPI.setupSession, null);
  yield put(controller.action.updateCtrl({ user: null }));
}

function * getSelfSaga ({ type, payload }) {
  // console.log(`%c ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
  //   , '\n payload:', payload
  // );
  try {
    yield call(getSelfExecutor);
  } catch ({ message }) {
    // NOTE do nothing
    yield call(signOutSaga, {});
  }
}
export function * getSelfExecutor () {
  const user = { name: 'I am a fake user data' };
  // const user = yield call(instanceAPI, { method: 'GET', url: 'auth/users/me' });
  yield put(controller.action.updateCtrl({ user }));
}
