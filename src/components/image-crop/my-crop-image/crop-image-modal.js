
// outsource dependencies
import ReactCrop from 'react-image-crop';
import { useDispatch } from 'react-redux';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

// local dependencies
import AlertError from '../../alert-error';
import { BoxLoader } from '../../preloader';
import { cropImageModalCtrl } from './controller';

// configure
export const useCropImageModal = () => {
  const dispatch = useDispatch();
  const close = useCallback(() => dispatch(cropImageModalCtrl.action.dismiss), [dispatch]);
  const open = useCallback((options) => dispatch(cropImageModalCtrl.action.initialize(options)), [dispatch]);
  return [open, close];
};

export const CropImageModal = memo(function CropImageModal (props) {
  const [crop, setCrop] = useState({
    aspect: 1, unit: '%', width: 50, height: 50, x: 25, y: 25
  });
  const [
    { initialized, show, disabled, errorMessage, preview },
    { dismiss, apply, updateCtrl }
  ] = useController(cropImageModalCtrl);

  // NOTE prepare page actions
  const handleDismiss = useCallback(() => dismiss(), [dismiss]);
  const handleClearError = useCallback(() => updateCtrl({ errorMessage: null }), [updateCtrl]);
  const handleCrop = (crop, percentCrop) => setCrop(percentCrop);
  const handleSave = event => {
    apply({ crop });
    dismiss(event);
  };

  return <Modal isOpen={show} toggle={handleDismiss}>
    <ModalHeader tag="h4" className="bg-primary mb-0" toggle={handleDismiss}> Crop Image </ModalHeader>
    <AlertError className="animated fadeIn mb-3" active message={errorMessage} onClear={handleClearError} />
    <ModalBody>
      <BoxLoader active={!initialized}>
        <ReactCrop
          crop={crop}
          src={preview}
          onChange={handleCrop}
        />
      </BoxLoader>
    </ModalBody>
    <ModalFooter className="justify-content-between">
      <Button color="danger" disabled={disabled} onClick={handleDismiss}> Cancel </Button>
      <Button color="success" disabled={disabled} onClick={handleSave}> Save </Button>
    </ModalFooter>
  </Modal>;
});

export default CropImageModal;
