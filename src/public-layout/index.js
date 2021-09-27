
// outsource dependencies
import _ from 'lodash';
import { Button } from 'reactstrap';
import { toastr } from 'react-redux-toastr';
import React, { memo, useEffect } from 'react';
import { useControllerData } from 'redux-saga-controller';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

// local dependencies
import { config } from '../constants';
import appRootCtrl from '../controller';
import * as ROUTES from '../constants/routes';

import NoMatch from '../no-match';
import { Avatar } from '../images';

import SignIn from './sign-in';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';
import ChangePassword from './change-password';
import EmailConfirmation from './email-confirmation';

const PublicLayout = memo(function PublicLayout () {
  const location = useLocation();
  const { user } = useControllerData(appRootCtrl);
  // NOTE show message to suggest proceed as detected user
  useEffect(() => {
    user && toastr.message('Authorization detected', 'Proceed as:', { component: UserProceed });
    // NOTE remove toastr automatically if we go out from public layout
    return () => toastr.removeByType('message');
  }, [user]);

  return <Switch>
    <Route exact path={ROUTES.SIGN_IN.ROUTE} component={SignIn} />
    <Route exact path={ROUTES.SIGN_UP.ROUTE} component={SignUp} />
    <Route exact path={ROUTES.FORGOT_PASSWORD.ROUTE} component={ForgotPassword} />
    <Route path={ROUTES.CHANGE_PASSWORD.ROUTE} component={ChangePassword} />
    <Route path={ROUTES.EMAIL_CONFIRMATION.ROUTE} component={EmailConfirmation} />
    {/* OTHERWISE */}
    { config.DEBUG
      ? <Route component={NoMatch} />
    // TODO on otherwise should redirect
      : <Redirect to={{ pathname: ROUTES.SIGN_IN.LINK(), state: { from: location } }}/>
    }
  </Switch>;
});

const UserProceed = memo(props => {
  const image = _.get(props, 'coverImage.url');
  const name = _.get(props, 'name', 'User Name');
  return <div className="d-flex align-items-center">
    <Avatar alt={name} src={image} className="flex-grow-0" style={{ width: '39px', height: '39px' }} />
    <Button color="link" className="flex-grow-1" href={ROUTES.WELCOME_SCREEN.LINK()}>
      <strong> { name } </strong>
    </Button>
  </div>;
});

export default PublicLayout;
