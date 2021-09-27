
// outsource dependencies
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect } from 'react';
import { Container, Row, Col, Table, Alert, Button, ButtonGroup } from 'reactstrap';

// local dependencies
import { propertiesListCtrl } from './controller';
import { FasIcon } from '../../../components/fa-icon';
import AlertError from '../../../components/alert-error';
import { BoxLoader } from '../../../components/preloader';
import { PROPERTIES_EDIT } from '../../../constants/routes';

export const PropertiesList = memo(function PropertiesList () {
  const [
    { initialized, errorMessage, properties },
    { initialize, updateCtrl, deleteItem }
  ] = useController(propertiesListCtrl);

  useEffect(() => { initialize(); }, [initialize]);

  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);

  return <BoxLoader active={!initialized}>
    <Container fluid>
      <h2 className="pt-3 mb-0 text-info"> Properties </h2>
      <hr className="row" />
      <Row>
        <Col xs="12" className="text-center">
          <AlertError className="animated fadeIn mb-3" active message={errorMessage} onClear={handleClearError} />
          {!_.size(properties) ? <Alert color="chrome" className="font-weight-bold text-center"> No known Users </Alert>
            : <Table className="mb-0" bordered striped>
              <thead>
                <tr>
                  <th className="text-left" width="30%"> Property Name </th>
                  <th width="20%"> Location </th>
                  <th width="17%"> Phone </th>
                  <th width="15%"> Website </th>
                  <th width="18%"> Actions </th>
                </tr>
              </thead>
              <tbody>
                {properties.map(({ id, address, company, phone, website }) => (
                  <tr key={id}>
                    <td className="p-3 h6 align-middle text-left">
                      <Link to={PROPERTIES_EDIT.LINK({ id })}>
                        { _.get(company, 'name', '-') }
                      </Link>
                    </td>
                    <td className="p-3 h6 align-middle">
                      { _.get(address, 'street', '-') }
                    </td>
                    <td className="p-3 h6 align-middle"> { phone } </td>
                    <td className="p-3 h6 align-middle">
                      <a href={website}> { website } </a>
                    </td>
                    <td className="p-3 h6 align-middle">
                      <ButtonGroup size="sm">
                        <Button
                          tag={Link}
                          color="primary"
                          className="mr-1"
                          to={PROPERTIES_EDIT.LINK({ id })}
                        >
                          <FasIcon icon="edit" size="sm" className="mr-1" />
                          Edit
                        </Button>
                        <Button onClick={() => deleteItem({ id })} color="danger">
                          <FasIcon icon="trash" size="sm" className="mr-1" />
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>}
        </Col>
      </Row>
    </Container>
  </BoxLoader>;
});

export default PropertiesList;
