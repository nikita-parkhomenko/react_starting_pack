
// outsource dependencies
import { Provider } from 'react-redux';
import React, { PureComponent } from 'react';
import { Form, reduxForm } from 'redux-form';
import { Button, Col, Container, Row } from 'reactstrap';

// local dependencies
import { store } from '../../store';

export const ReduxWrapper = ({ children }) => {
  return <Provider store={store}>
    <div> { children } </div>
  </Provider>;
};

class TestForm extends PureComponent {
  render () {
    const { dirty, pristine, invalid, handleSubmit, reset, children } = this.props;
    return <Form onSubmit={handleSubmit} autoComplete="off">
      <Container className="pt-3">
        <Row>
          <Col xs="12" tag="h4" className="text-center">
            Test redux form control
          </Col>
        </Row>
        <Row> <Col tag="code" xs="12"> pristine: { JSON.stringify(pristine, null, 2) } </Col> </Row>
        <Row> <Col tag="code" xs="12"> invalid: { JSON.stringify(invalid, null, 2) } </Col> </Row>
        <Row> <Col tag="code" xs="12"> dirty: { JSON.stringify(dirty, null, 2) } </Col> </Row>
        <Row> <Col xs={{ size: 6, offset: 3 }}> { children } </Col> </Row>
        <Button color="warning" className="mr-3" type="button" onClick={reset}> Reset </Button>
        <Button color="primary" type="submit"> Update </Button>
      </Container>
    </Form>;
  }
}
const ConnectedTestForm = reduxForm({
  form: 'test',
  onSubmit: formData => alert(JSON.stringify(formData, null, 2)),
  validate: values => {
    const errors = {};
    if (!values.test1) {
      errors.test1 = 'Test validation error 1';
    }
    if (!values.test2) {
      errors.test2 = 'Test validation error 2';
    }
    return errors;
  }
})(TestForm);

export const WrappedConnectedReduxForm = ({ children, ...attr }) => <ReduxWrapper>
  <ConnectedTestForm {...attr}>
    { children }
  </ConnectedTestForm>
</ReduxWrapper>;
