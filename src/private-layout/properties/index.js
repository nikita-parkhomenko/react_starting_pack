
// outsource dependencies
import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// local dependencies
import config from '../../constants';
import * as ROUTES from '../../constants/routes';

import PropertiesList from './list';
import PropertiesEdit from './edit';
import NoMatch from '../../no-match';

const Properties = memo(function Properties () {
  return <Switch>
    <Route path={ROUTES.PROPERTIES_LIST.ROUTE} component={PropertiesList} />
    <Route path={ROUTES.PROPERTIES_EDIT.ROUTE} component={PropertiesEdit} />
    {/* OTHERWISE */}
    { config.DEBUG
      ? <Route component={NoMatch} />
      : <Redirect to={ROUTES.PROPERTIES_LIST.LINK()} />
    }
  </Switch>;
});

export default Properties;
