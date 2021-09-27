
// outsource dependencies
import _ from 'lodash';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect } from 'react';
import { Container, Row, Col, Table, ButtonGroup, Button } from 'reactstrap';

// local dependencies
import { usersListCtrl } from './controller';
import { useUserEditModal } from '../edit-modal';
import { FasIcon } from '../../../components/fa-icon';
import AlertError from '../../../components/alert-error';
import { BoxLoader } from '../../../components/preloader';

export const UsersList = memo(function UsersList () {
  const [
    { initialized, errorMessage, users },
    { initialize, updateCtrl, deleteItem }
  ] = useController(usersListCtrl);

  useEffect(() => { initialize(); }, [initialize]);

  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);
  // NOTE get modal window controls
  const [openUserEditModal] = useUserEditModal();

  return <BoxLoader active={!initialized}>
    <Container fluid>
      <h2 className="pt-3 mb-0 text-info"> Users </h2>
      <hr className="row" />
      <Row>
        <Col xs="12" className="text-center">
          <AlertError className="animated fadeIn mb-3" active message={errorMessage} onClear={handleClearError} />
          {!_.size(users) ? <h3> No users found! </h3> : <Table className="mb-0" bordered striped>
            <thead>
              <tr>
                <th className="text-left" width="30%"> Full Name </th>
                <th width="25%"> Company Name </th>
                <th width="25%"> Email </th>
                <th width="20%"> Actions </th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, company }) => (
                <tr key={id}>
                  <td
                    style={{ cursor: 'pointer' }}
                    onClick={() => openUserEditModal(id)}
                    className="p-3 h6 align-middle text-left"
                  >
                    { name }
                  </td>
                  <td className="p-3 h6 align-middle"> { company.name } </td>
                  <td className="p-3 h6 align-middle"> { email } </td>
                  <td className="p-3 h6 align-middle">
                    <ButtonGroup size="sm">
                      <Button
                        color="primary"
                        className="mr-1"
                        onClick={() => openUserEditModal(id)}
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

export default UsersList;
