
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
import { BoxLoader, Spinner } from '../../components/preloader';
import { FORGOT_PASSWORD, SIGN_IN } from '../../constants/routes';
import { isEmail, isName } from '../../services/validation.service';

// configure
const FORM_NAME = 'signUpForm';
const formValidation = values => {
  const errors = {};
  if (!isName(values.name)) {
    errors.name = 'Name is required and should contain at least 3 symbol character';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must contain at least 8 symbol character';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

const SignUp = memo(function SignUp () {
  const [
    { initialized, disabled, errorMessage },
    { initialize, updateData, updateCtrl },
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
              name="name"
              type="text"
              component={RFInput}
              disabled={disabled}
              placeholder="Username"
              label={<strong className="required-asterisk"> Name </strong>}
            />
            <Field
              type="text"
              name="email"
              component={RFInput}
              disabled={disabled}
              placeholder="Email"
              label={<strong className="required-asterisk"> Email Address </strong>}
            />
            <Field
              name="password"
              type="password"
              component={RFInput}
              disabled={disabled}
              placeholder="Password"
              label={<strong className="required-asterisk"> Password </strong>}
            />
            <Field
              type="password"
              component={RFInput}
              disabled={disabled}
              name="confirmPassword"
              placeholder="Confirmation"
              label={<strong className="required-asterisk"> Confirm Password </strong>}
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
              <span> Sign Up </span>
              <Spinner active={disabled} />
            </Button>
            <AlertError active message={errorMessage} onClear={handleClearError}/>
          </Col>
          <Col xs="12" className="text-center mb-3">
            <Link to={SIGN_IN.LINK()}>
              <strong> Sign In </strong>
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

export default SignUp;
