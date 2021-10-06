
// outsource dependencies
import { Field } from 'redux-form';
import { useDispatch } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { useController } from 'redux-saga-controller';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// local dependencies
import { userEditModalCtrl } from './controller';
import { IMG_DIR } from '../../../constants/spec';
import { RFInput } from '../../../components/input';
import AlertError from '../../../components/alert-error';
import { BoxLoader } from '../../../components/preloader';
import { isEmail } from '../../../services/validation.service';
import { ReduxForm } from '../../../components/redux-form-helpers';
import InputCropImage from '../../../components/image-crop/my-crop-image/crop-image-input';

// configure
export const useUserEditModal = () => {
  const dispatch = useDispatch();
  const close = useCallback(() => dispatch(userEditModalCtrl.action.dismiss()), [dispatch]);
  const open = useCallback(id => dispatch(userEditModalCtrl.action.initialize({ id })), [dispatch]);
  return [open, close];
};

export const UsersEditModal = memo(function UsersEditModal () {
  const [
    { initialized, show, disabled, initialValues, errorMessage },
    { dismiss, apply, updateCtrl }
  ] = useController(userEditModalCtrl);

  // NOTE prepare page actions
  const handleDismiss = useCallback(() => dismiss(), [dismiss]);
  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);

  return <Modal isOpen={show} toggle={handleDismiss}>
    <ReduxForm
      onSubmit={apply}
      form="edit-user-modal"
      validate={formValidation}
      initialValues={initialValues}
    >
      <ModalHeader tag="h4" className="bg-primary mb-0" toggle={handleDismiss}>Edit user</ModalHeader>
      <AlertError className="animated fadeIn mb-3" active message={errorMessage} onClear={handleClearError} />
      <ModalBody>
        <BoxLoader active={!initialized}>
          <Field
            dir={IMG_DIR.USER}
            name="profileImage.url"
            component={InputCropImage}
            accept="image/jpe, image/jpg, image/jpeg, image/gif, image/png"
            label={<strong className="text-info required-asterisk">
              Avatar
            </strong>}
          />
          <Field
            name="name"
            component={RFInput}
            disabled={disabled}
            placeholder="Edit Name"
            label={<strong className="required-asterisk"> Edit Name </strong>}
          />
          <Field
            name="email"
            component={RFInput}
            disabled={disabled}
            placeholder="New Email"
            label={<strong className="required-asterisk"> New Email </strong>}
          />
        </BoxLoader>
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <Button color="danger" disabled={disabled} onClick={handleDismiss}> Cancel </Button>
        <Button type="submit" color="success" disabled={disabled}> Apply </Button>
      </ModalFooter>
    </ReduxForm>
  </Modal>;
});

const formValidation = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

export default UsersEditModal;
