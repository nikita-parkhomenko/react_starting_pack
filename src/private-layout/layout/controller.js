
// outsource dependencies
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import { create } from 'redux-saga-controller';
import { takeEvery, put, select, call, delay } from 'redux-saga/effects';

// local dependencies
import MENU from '../menu';
import appRootCtrl from '../../controller';
import { silence } from '../../runtime-error';

// configure
export const controller = create({
  prefix: 'private-layout',
  actions: {
    initialize: 'INITIALIZE',
    toggleAsideMenu: 'TOGGLE_ASIDE_MENU',
    submitSearchForm: 'SUBMIT_SEARCH_FORM',
  },
  initial: {
    menu: [],
    search: '',
    expanded: true,
    lastOpened: null,
    showSearch: false,
    initialized: false,
  },
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, silence, initializeSaga);
    yield takeEvery(controller.action.toggleAsideMenu.TYPE, toggleAsideMenuSaga);
    yield takeEvery(controller.action.submitSearchForm.TYPE, submitSearchFormSaga);
  }
});

export default controller;

function * initializeSaga () {
  try {
    const { user } = yield select(appRootCtrl.select);
    // console.log('%c LAYOUT initializeSaga ', 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    //   , '\n user:', user
    //   , '\n menu size:', _.size(MENU)
    // );
    // NOTE probably we should prepare menu some hov before show it to user
    yield put(controller.action.updateCtrl({ menu: MENU }));
    throw new Error('Not implemented yet !!!');
  } catch ({ message }) {
    // FIXME do not know why but toastr does not appear without delay in case updating process of Layout component
    yield delay(0.5 * 1000);
    yield call(toastr.error, 'Error: Layout initialize', message);
  }
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * submitSearchFormSaga ({ type, ...formData }) {
  try {
    // console.log('%c LAYOUT submitSearchFormSaga ', 'color: #FF6766; font-weight: bolder; font-size: 12px;'
    //   , '\n formData:', formData
    // );
    throw new Error('Not implemented yet !!!');
  } catch ({ message }) {
    yield call(toastr.error, 'Error: Layout submit search', message);
  }
  // NOTE hide form & clear value
  // yield put(controller.action.updateCtrl({ showSearch: false, searchInput: '' }));
}

function * toggleAsideMenuSaga () {
  const { expanded } = yield select(controller.select);
  yield put(controller.action.updateCtrl({ expanded: !expanded }));
}
