
// outsource dependencies
import React, { memo, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useController } from 'redux-saga-controller';

// local dependencies
import controller from './controller';

import { Logo } from '../../images';
import { SIGN_IN } from '../../constants/routes';
import { BoxLoader } from '../../components/preloader';

// configure

const EmailConfirmation = memo(function EmailConfirmation () {
  const { token } = useParams();
  const [
    { initialized, isTokenValid },
    { initialize },
  ] = useController(controller);
    // NOTE initialize business logic
  useEffect(() => { initialize({ token }); }, [initialize, token]);

  return <BoxLoader active={!initialized}>
    <div className="d-flex align-items-center justify-content-center h-100">
      <Container fluid style={{ width: 390, maxWidth: '95%' }}>
        <Row className="align-items-center">
          <Col xs="12" className="text-center pt-3 mb-3">
            <Logo className="img-fluid" style={{ width: 100 }} />
            <h3 className="pt-1 text-center text-primary"> Estative </h3>
          </Col>
          <Col xs="12" tag="h3" className="text-center mb-4">
                        Email verification
          </Col>
          { !isTokenValid ? <Col
            tag="h5"
            xs={{ size: 10, offset: 1 }}
            className="text-justify text-danger mb-4"
          >
                        Whoa there! The request token for this page is invalid.
                        It may have already been used, or expired because it is too old.
                        Please go back and try again.
            <br/><br/>
            <small className="text-muted"> it was probably just a mistake </small>
          </Col> : <Col
            tag="h4"
            xs={{ size: 10, offset: 1 }}
            className="text-center text-success mb-4"
          >
                        The email address was successfully verified. Welcome aboard !
          </Col>}
          <Col xs="12" className="text-right mb-3">
            <Link to={SIGN_IN.LINK()}>
                            Sign In
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  </BoxLoader>;
});

export default EmailConfirmation;
