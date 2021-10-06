
// outsource dependencies
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, call, delay, select } from 'redux-saga/effects';

// local dependencies
import { IMG_DIR } from '../../../constants/spec';
import { instanceAPI } from '../../../services/request.service';

// configure
export const cropImageModalCtrl = create({
  prefix: 'crop-image-modal',
  actions: {
    // NOTE Main modal actions
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
    // NOTE File and add info
    dir: '',
    file: null,
    preview: '',
    url: '',
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
    const file = _.get(payload, 'file', null);
    const dir = _.get(payload, 'dir', IMG_DIR.DEFAULT);
    const preview = URL.createObjectURL(new Blob(file));
    yield put(cropImageModalCtrl.action.updateCtrl({ file, dir, preview }));
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
    const crop = _.get(payload, 'crop');
    const data = yield call(prepareFormData);
    // TODO implement upload image request
    yield call(instanceAPI, {
      data,
      params: crop,
      method: 'POST',
      url: 'images/upload',
      headers: { 'content-type': 'multipart/form-data' }
    });
    yield call(toastr.success, 'Image', 'Image was successfully uploaded');
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
  // yield put(cropImageModalCtrl.action.clearCtrl());
}

function * prepareFormData () {
  const { file, dir } = yield select(cropImageModalCtrl.select);
  const data = new FormData();
  const fileName = !_.isString(file.name) ? 'image' : file.name.replace(/[^\d|A-Z|a-z]/g, '_').replace(/_+/g, '_');
  data.append('dir', dir);
  data.append('file', new Blob(file), fileName);
  return data;
}
