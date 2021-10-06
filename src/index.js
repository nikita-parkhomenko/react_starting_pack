
// outsource dependencies
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
// STYLES inject ...
import './style';
// polyfill
import './polyfill';
//
import registerServiceWorker from './registerServiceWorker';
// local dependencies
import { config } from './constants';
import { history, store } from './store';
import * as ROUTES from './constants/routes';
import { Modal as ImageCropModal } from './components/image-crop';
import { CropImageModal } from './components/image-crop/my-crop-image/crop-image-modal';

import controller from './controller';

import NoMatch from './no-match';
import Maintenance from './maintenance';
import PublicLayout from './public-layout';
import PrivateLayout from './private-layout';
import Preloader from './components/preloader';

const App = memo(function App () {
  // NOTE subscribe app controller
  const [{ initialized, health }, { initialize }] = useController(controller);
  // NOTE initialize business logic
  useEffect(() => { initialize(); }, [initialize]);
  // NOTE select view based on application state
  if (!health) { return <Maintenance />; }
  if (!initialized) { return <Preloader active={true} />; }
  return <>
    <Router history={history}>
      <Switch>
        <Route path={ROUTES.LAYOUT_PUBLIC} component={PublicLayout} />
        <Route path={ROUTES.LAYOUT_PRIVATE} component={PrivateLayout} />
        { config.DEBUG
        // NOTE otherwise only for debug
          ? <Route component={NoMatch} />
          : <Redirect to={{ pathname: ROUTES.SIGN_IN.LINK(), state: { from: history.location } }}/>
        }
      </Switch>
    </Router>
    <ReduxToastr
      progressBar
      timeOut={2000}
      preventDuplicates
      newestOnTop={false}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
    <ImageCropModal />
    <CropImageModal />
  </>;
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
