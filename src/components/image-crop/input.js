
// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { toastr } from 'react-redux-toastr';
import React, { memo, useCallback, useRef } from 'react';

// local dependencies
import DefImage from '../../images';
import { showModal } from './index';
import { RFControlWrap } from '../redux-form-helpers';

const InputImage = memo(({ input, meta, label, skipTouch, classNameFormGroup, usePopover, cropOptions, ...attr }) => {
  let message = '';
  if (skipTouch || meta.touched) {
    message = meta.error;
    if (_.isString(attr.className)) {
      attr.className += meta.valid ? ' is-valid' : ' is-invalid';
    }
  }
  const dropzoneRef = useRef(null);
  const uploadFile = useCallback(() => dropzoneRef.current && dropzoneRef.current.open(), []);
  const handleDrop = useCallback(([file]) => {
    showModal(file, cropOptions)
      .then(({ url }) => input.onChange(url))
      .catch(({ message }) => toastr.error(message));
  }, [cropOptions, input]);

  return <RFControlWrap
    id={input.name}
    message={message}
    usePopover={usePopover}
    className={classNameFormGroup}
    label={<div onClick={uploadFile}> { label } </div>}
  >
    <Dropzone
      ref={dropzoneRef}
      rejectClassName="reject"
      activeClassName="active"
      acceptClassName="success"
      style={{ height: 'auto' }}
      disabledClassName="disabled"
      className="form-control drop-zone"
      accept="image/jpe, image/jpg, image/jpeg, image/gif, image/png"
      { ...attr }
      onDrop={handleDrop}
    >
      <DefImage
        src={input.value}
        defaultClassName="img-fluid"
        defaultAlt="Input image preview"
        defaultTitle="Input image preview"
      />
    </Dropzone>
  </RFControlWrap>;
});

InputImage.propTypes = {
  disabled: PropTypes.bool,
  skipTouch: PropTypes.bool,
  cropOptions: PropTypes.object,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  classNameFormGroup: PropTypes.string,
  usePopover: RFControlWrap.propTypes.usePopover,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.element]),
};

InputImage.defaultProps = {
  label: null,
  disabled: false,
  skipTouch: true,
  usePopover: null,
  cropOptions: null,
  classNameFormGroup: '',
};

export default InputImage;
