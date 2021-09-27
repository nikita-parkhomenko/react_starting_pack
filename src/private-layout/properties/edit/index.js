
// outsource dependencies
import { Field } from 'redux-form';
import { useParams, Link } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

// local dependencies
import { propertiesEditCtrl } from './controller';
import { RFInput } from '../../../components/input';
import AlertError from '../../../components/alert-error';
import { BoxLoader } from '../../../components/preloader';
import { PROPERTIES_LIST } from '../../../constants/routes';
import { ReduxForm } from '../../../components/redux-form-helpers';

// configure
const FORM_NAME = 'edit-property';
const formValidation = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  return errors;
};

const PropertiesEdit = memo(function PropertiesEdit () {
  const { id } = useParams();
  const [
    { initialized, disabled, errorMessage, initialValues },
    { initialize, updateData, updateCtrl }
  ] = useController(propertiesEditCtrl);

  useEffect(() => {
    initialize({ id });
  }, [initialize, id]);

  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);

  return <BoxLoader active={!initialized}>
    <Container fluid>
      <h2 className="text-info mb-0 pt-3"> Property/{initialValues.name} </h2>
      <hr className="row" />
      <AlertError className="animated fadeIn mb-3" active message={errorMessage} onClear={handleClearError} />
      <ReduxForm
        form={FORM_NAME}
        onSubmit={updateData}
        validate={formValidation}
        initialValues={initialValues}
      >
        <Card className="mb-2">
          <CardBody>
            <Row>
              <Col xs="6">
                <Field
                  name="name"
                  component={RFInput}
                  disabled={disabled}
                  placeholder="Property Name"
                  label={<strong className="required-asterisk"> Property Name </strong>}
                />
                <Field
                  name="address.street"
                  component={RFInput}
                  disabled={disabled}
                  placeholder="Location"
                  label={<strong className="required-asterisk"> Location </strong>}
                />
              </Col>
              <Col xs="6">
                <Field
                  name="phone"
                  component={RFInput}
                  disabled={disabled}
                  placeholder="Phone"
                  label={<strong className="required-asterisk"> Phone </strong>}
                />
                <Field
                  name="website"
                  component={RFInput}
                  disabled={disabled}
                  placeholder="Website"
                  label={<strong className="required-asterisk"> Website </strong>}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <Button tag={Link} to={PROPERTIES_LIST.LINK()} color="danger"> Back </Button>
              <Button className="text-right" type="submit" color="success"> Save </Button>
            </div>
          </CardBody>
        </Card>
      </ReduxForm>
    </Container>
  </BoxLoader>;
});

export default PropertiesEdit;
