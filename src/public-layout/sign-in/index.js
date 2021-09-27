
// outsource dependencies
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import { Container, Row, Button, Col } from 'reactstrap';
import React, { memo, useCallback, useEffect } from 'react';

// local dependencies
import controller from './controller';
import { ReduxForm } from '../../components/redux-form-helpers';

import { Logo } from '../../images';
import { RFInput } from '../../components/input';
import AlertError from '../../components/alert-error';
import { isEmail } from '../../services/validation.service';
import { BoxLoader, Spinner } from '../../components/preloader';
import { FORGOT_PASSWORD, SIGN_UP } from '../../constants/routes';

// configure
const FORM_NAME = 'signInForm';
const formValidation = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Email is required';
  } else if (!isEmail(values.username)) {
    errors.username = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

const SignIn = memo(function SignIn () {
  const [
    { initialized, disabled, errorMessage },
    { initialize, updateData, updateCtrl }
  ] = useController(controller);
    // NOTE initialize business logic
  useEffect(() => { initialize(); }, [initialize]);
  // NOTE prepare page actions
  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);

  return <BoxLoader active={!initialized}>
    <ReduxForm
      form={FORM_NAME}
      onSubmit={updateData}
      validate={formValidation}
      className="d-flex align-items-center justify-content-center h-100"
    >
      <Container fluid style={{ width: 390, maxWidth: '95%' }}>
        <Row>
          <Col xs="12" className="text-center pt-3 mb-3">
            <Logo className="img-fluid" style={{ width: 100 }} />
            <h3 className="pt-1 text-center text-primary"> Estative </h3>
          </Col>
          <Col xs={{ size: 10, offset: 1 }}>
            <Field
              type="text"
              name="username"
              component={RFInput}
              disabled={disabled}
              placeholder="Email Address"
            />
            <Field
              name="password"
              type="password"
              component={RFInput}
              disabled={disabled}
              placeholder="Password"
            />
            <Button
              block
              outline
              type="submit"
              color="primary"
              className="mb-3"
              disabled={disabled}
              style={{ borderRadius: 20 }}
            >
              <span> LOGIN </span>
              <Spinner active={disabled} />
            </Button>
            <AlertError active message={errorMessage} onClear={handleClearError}/>
          </Col>
          <Col xs="12" className="text-center mb-3">
            <Link to={SIGN_UP.LINK()}>
              <strong> Sign Up </strong>
            </Link>
          </Col>
          <Col xs="12" className="text-center mb-3">
            <Link to={FORGOT_PASSWORD.LINK()}>
              <strong> Forgot your password ? </strong>
            </Link>
          </Col>
        </Row>
      </Container>
    </ReduxForm>
  </BoxLoader>;
});

export default SignIn;
