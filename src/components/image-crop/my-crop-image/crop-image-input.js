
// outsource dependencies
import _ from 'lodash';
import cn from 'classnames';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, memo } from 'react';

// local dependencies
import DefImage from '../../../images';
import { RFControlWrap } from '../../redux-form-helpers';
import { useCropImageModal } from './crop-image-modal';

export const InputCropImage = memo(function (props) {
  const { input, meta, label, skipTouch, classNameFormGroup, usePopover, dir, ...attr } = props;

  let message = '';
  if (skipTouch || meta.touched) {
    message = meta.error;
    if (_.isString(attr.className)) {
      attr.className += meta.valid ? ' is-valid' : ' is-invalid';
    }
  }
  // NOTE get modal window controls
  const [openImageCropModal] = useCropImageModal();

  const onDrop = useCallback(acceptedFile => {
    openImageCropModal({ file: acceptedFile, dir });
  }, [openImageCropModal, dir]);

  // NOTE prepare dropzone controls
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpe, image/jpg, image/jpeg, image/gif, image/png',
    ...attr
  });

  return <RFControlWrap
    label={label}
    id={input.name}
    message={message}
    usePopover={usePopover}
    className={cn('input-image', classNameFormGroup)}
  >
    <div { ...getRootProps({
      className: cn('input-image-container', { active: isDragActive, accept: isDragAccept, reject: isDragReject })
    }) }>
      <input { ...getInputProps({ className: 'input-image-control' }) } />
      <DefImage
        src={input.value}
        defaultClassName="img-fluid"
        defaultAlt="Input image preview"
        defaultTitle="Input image preview"
      />
    </div>
  </RFControlWrap>;
}
);

export default InputCropImage;
