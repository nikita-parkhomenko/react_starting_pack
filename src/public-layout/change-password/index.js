
// outsource dependencies
import { Field } from 'redux-form';
import { Link, useParams } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import { Container, Row, Button, Col } from 'reactstrap';
import React, { memo, useCallback, useEffect } from 'react';

// local dependencies
import controller from './controller';
import { ReduxForm } from '../../components/redux-form-helpers';

import { FORGOT_PASSWORD, SIGN_IN } from '../../constants/routes';

import { Logo } from '../../images';
import { RFInput } from '../../components/input';
import AlertError from '../../components/alert-error';
import { BoxLoader, Spinner } from '../../components/preloader';

// configure
const FORM_NAME = 'changePasswordForm';
const formValidation = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password confirmation is required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords confirmation do not match with password';
  }
  return errors;
};

const ChangePassword = memo(function ChangePassword () {
  const { token } = useParams();
  const [
    { initialized, disabled, errorMessage, isTokenValid },
    { initialize, updateData, updateCtrl },
  ] = useController(controller);
    // NOTE initialize business logic
  useEffect(() => { initialize({ token }); }, [initialize, token]);
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
          { !isTokenValid ? <InvalidTokenMessage /> : <>
            <Col xs={{ size: 10, offset: 1 }}>
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
                placeholder="Confirm password"
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
                                Change password
                <Spinner active={disabled} />
              </Button>
              <AlertError active message={errorMessage} onClear={handleClearError}/>
            </Col>
            <Col xs="6" className="mb-3">
              <Link to={SIGN_IN.LINK()}> Sign In </Link>
            </Col>
            <Col xs="6" className="text-right mb-3">
              <Link to={FORGOT_PASSWORD.LINK()}> Forgot Password ? </Link>
            </Col>
          </> }
        </Row>
      </Container>
    </ReduxForm>
  </BoxLoader>;
});

export default ChangePassword;

const InvalidTokenMessage = () => <Col xs={{ size: 10, offset: 1 }} tag="h5" className="text-justify text-danger mb-4">
    Whoa there! The request token for this page is invalid.
    It may have already been used, or expired because it is too old.
    Please go back to the
  <Link to={FORGOT_PASSWORD.LINK()}> forgot password page </Link>
    and try again.
  <br/><br/>
  <small className="text-muted"> it was probably just a mistake </small>
</Col>;
