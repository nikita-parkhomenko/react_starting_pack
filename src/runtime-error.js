
// outsource dependencies
import _ from 'lodash';
import { call } from 'redux-saga/effects';

// local dependencies
import { config } from './constants';

/**
 * helper to simplify handling exception
 * @example
    yield call(silence, nonSafeAction, some, data);
    // or
    yield takeEvery(ACTION, silence, realActionHandlerExe);
 */
export function * silence (...args) {
  try {
    return yield call(...args);
  } catch (error) {
    const payload = args[1];
    const type = _.get(payload, 'type');
    // NOTE any common actions to handle error
    // TODO specific results for handling error
    config.DEBUG && console.info(`%c SILENCE ${type} `, 'color: #FF6766; font-weight: bolder; font-size: 12px;'
      , '\n payload:', payload
      , '\n all:', args
    );
    return void(0);
  }
}
