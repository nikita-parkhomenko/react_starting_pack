
// outsource dependencies
import _ from 'lodash';
import { useCallback, useState } from 'react';
import { useControllerData } from 'redux-saga-controller';

// local dependencies
import appRootCtrl from './controller';

/**
 * logged user or null if it was not logged
 */
export const useSelf = () => _.get(useControllerData(appRootCtrl), 'user', null);

/**
 * correct extract ref to provide ability use ref with "useEffect" hook
 */
export const useRefCallback = () => {
  const [stored, set] = useState(null);
  // NOTE prevent update "reference" within render
  const ref = useCallback(api => api && set(api), []);
  return [stored, ref];
};
