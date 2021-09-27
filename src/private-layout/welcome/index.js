
// outsource dependencies
import { Field } from 'redux-form';
import React, { memo } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

// local dependencies
import { Logo } from '../../images';
import { ReduxForm } from '../../components/redux-form-helpers';
import InputCropImage from '../../components/image-crop/crop-image-input';

const Welcome = memo(function Welcome () {
  return <Container fluid>
    <h4 className="pt-3 mb-0 text-center"> Welcome to Estative! </h4>
    <hr className="row" />
    <Row>
      <Col xs="12" className="text-center">
        <Logo className="img-fluid" style={{ width: 300 }} />
        <h1 className="pt-3 mb-0 text-center text-primary"> Estative </h1>
        <ReduxForm
          form="image"
          onSubmit={(formValues) => console.log(formValues)}
        >
          <Field
            dir="AVATAR"
            name="avatar"
            component={InputCropImage}
            accept="image/jpe, image/jpg, image/jpeg, image/gif, image/png"
            label={<strong className="text-info required-asterisk">
              Attach Avatar
            </strong>}
          />
          <Button type="submit">Save</Button>
        </ReduxForm>
      </Col>
    </Row>
  </Container>;
});

export default Welcome;
