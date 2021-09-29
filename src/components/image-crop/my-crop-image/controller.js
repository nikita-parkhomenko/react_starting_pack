
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay } from 'redux-saga/effects';

// local dependencies

// configure
export const cropImageModalCtrl = create({
  prefix: 'crop-image-modal',
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
    yield takeEvery(cropImageModalCtrl.action.apply.TYPE, applySaga);
    yield takeEvery(cropImageModalCtrl.action.dismiss.TYPE, dismissSaga);
    yield takeEvery(cropImageModalCtrl.action.initialize.TYPE, initializeSaga);
  }
});

export default cropImageModalCtrl;

function * initializeSaga ({ type, payload }) {
  try {
    // NOTE show modal & setup options
    yield put(cropImageModalCtrl.action.updateCtrl({ show: true }));
    // NOTE initial request
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
  }
  yield put(cropImageModalCtrl.action.updateCtrl({ initialized: true }));
}

function * applySaga ({ type, payload }) {
  yield put(cropImageModalCtrl.action.updateCtrl({ disabled: true }));
  try {
    yield call(toastr.success, 'Image', 'Image was successfully updataed');
    yield put(cropImageModalCtrl.action.closeResolve());
    yield call(closeModalSaga);
  } catch ({ message }) {
    yield call(toastr.error, 'Error', message);
    yield put(cropImageModalCtrl.action.updateCtrl({ errorMessage: message }));
  }
  yield put(cropImageModalCtrl.action.updateCtrl({ disabled: false }));
}

function * dismissSaga () {
  yield put(cropImageModalCtrl.action.closeReject());
  yield call(closeModalSaga);
}

function * closeModalSaga () {
  yield put(cropImageModalCtrl.action.close());
  yield put(cropImageModalCtrl.action.updateCtrl({ show: false }));
  yield delay(0.3 * 1000); // NOTE give chance to animation
  yield put(cropImageModalCtrl.action.clearCtrl());
}
