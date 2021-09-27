
// outsource dependencies
import React, { memo } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

// local dependencies
import { useSelf } from '../hooks';
import { config } from '../constants';
import * as ROUTES from '../constants/routes';

import Users from './users';
import Layout from './layout';
import Welcome from './welcome';
import NoMatch from '../no-match';
import Properties from './properties';

const PrivatePages = memo(function PrivatePages () {
  const user = useSelf();
  const location = useLocation();

  return !user
    ? <Redirect to={{ pathname: ROUTES.SIGN_IN.ROUTE, state: { from: location } }}/>
    : <Layout>
      <Switch>
        <Route path={ROUTES.WELCOME_SCREEN.ROUTE} component={Welcome} />
        <Route path={ROUTES.PROPERTIES.ROUTE} component={Properties} />
        <Route path={ROUTES.USERS.ROUTE} component={Users} />
        {/*OTHERWISE*/}
        { config.DEBUG
          ? <Route component={NoMatch} />
          : <Redirect to={{ pathname: ROUTES.WELCOME_SCREEN.LINK(), state: { from: location } }}/>
        }
      </Switch>
    </Layout>;
});

export default PrivatePages;
