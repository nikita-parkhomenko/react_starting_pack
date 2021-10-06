
// outsource dependencies
import React, { memo } from 'react';
import { Container, Row, Col } from 'reactstrap';

// local dependencies
import { Logo } from '../../images';

const Welcome = memo(function Welcome () {
  return <Container fluid>
    <h4 className="pt-3 mb-0 text-center"> Welcome to Estative! </h4>
    <hr className="row" />
    <Row>
      <Col xs="12" className="text-center">
        <Logo className="img-fluid" style={{ width: 300 }} />
        <h1 className="pt-3 mb-0 text-center text-primary"> Estative </h1>
      </Col>
    </Row>
  </Container>;
});

export default Welcome;
