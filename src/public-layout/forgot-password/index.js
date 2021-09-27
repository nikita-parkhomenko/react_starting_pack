
// outsource dependencies
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import { Container, Row, Button, Col } from 'reactstrap';
import React, { memo, useCallback, useEffect } from 'react';

// local dependencies
import controller from './controller';
import { isEmail } from '../../services/validation.service';

import { SIGN_IN, SIGN_UP } from '../../constants/routes';

import { Logo } from '../../images';
import { RFInput } from '../../components/input';
import AlertError from '../../components/alert-error';
import { ReduxForm } from '../../components/redux-form-helpers';
import { BoxLoader, Spinner } from '../../components/preloader';

// configure
const FORM_NAME = 'forgotPasswordForm';
const formValidation = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const ForgotPassword = memo(function ForgotPassword () {
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
        <Row className="align-items-center">
          <Col xs="12" className="text-center pt-3 mb-3">
            <Logo className="img-fluid" style={{ width: 100 }} />
            <h3 className="pt-1 text-center text-primary"> Estative </h3>
          </Col>
          <Col xs="12" tag="h2" className="text-center text-info">
                        Forgot password ?
          </Col>
          <Col xs="12" tag="h4" className="text-center text-muted mb-4">
                        Please enter your email address, and we&apos;ll send you a password reset email.
          </Col>
          <Col xs={{ size: 10, offset: 1 }}>
            <Field
              type="text"
              name="email"
              component={RFInput}
              disabled={disabled}
              placeholder="Email Address"
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
                            Reset Password
              <Spinner active={disabled} />
            </Button>
            <AlertError active message={errorMessage} onClear={handleClearError}/>
          </Col>
          <Col xs="6" className="text-center mb-3">
            <Link to={SIGN_IN.LINK()}>
              <strong> Sign In </strong>
            </Link>
          </Col>
          <Col xs="6" className="text-center mb-3">
            <Link to={SIGN_UP.LINK()}>
              <strong> Sign Up </strong>
            </Link>
          </Col>
        </Row>
      </Container>
    </ReduxForm>
  </BoxLoader>;
});

export default ForgotPassword;
