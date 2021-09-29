
// outsource dependencies
import { useDispatch } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { cropImageModalCtrl } from './controller';
import { useController } from 'redux-saga-controller';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// local dependencies
import AlertError from '../../alert-error';
import { BoxLoader } from '../../preloader';

// configure
export const useCropImageModal = () => {
  const dispatch = useDispatch();
  const close = useCallback(() => dispatch(cropImageModalCtrl.action.dismiss), [dispatch]);
  const open = useCallback((options) => dispatch(cropImageModalCtrl.action.initialize(options)), [dispatch]);
  return [open, close];
};

export const CropImageModal = memo(function CropImageModal (props) {
  const [
    { initialized, show, disabled, errorMessage },
    { dismiss, apply, updateCtrl }
  ] = useController(cropImageModalCtrl);

  // NOTE prepare page actions
  const handleDismiss = useCallback(() => dismiss(), [dismiss]);
  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);

  return <Modal isOpen={show} toggle={handleDismiss}>
    <ModalHeader tag="h4" className="bg-primary mb-0" toggle={handleDismiss}> Crop Image </ModalHeader>
    <AlertError className="animated fadeIn mb-3" active message={errorMessage} onClear={handleClearError} />
    <ModalBody>
      <BoxLoader active={!initialized}>
      </BoxLoader>
    </ModalBody>
    <ModalFooter className="justify-content-between">
      <Button color="danger" disabled={disabled} onClick={handleDismiss}> Cancel </Button>
      <Button type="submit" color="success" disabled={disabled}> Save </Button>
    </ModalFooter>
  </Modal>;
});

export default CropImageModal;
