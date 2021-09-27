
// outsource dependencies
import _ from 'lodash';
import cn from 'classnames';
import { useDropzone } from 'react-dropzone';
import React, { useState, useCallback } from 'react';

// local dependencies
import { RFControlWrap } from '../redux-form-helpers';

const InputCropImage = ({ input, meta, label, skipTouch, classNameFormGroup, usePopover, cropOptions, ...attr }) => {
  const [files, setFiles] = useState([]);

  let message = '';
  if (skipTouch || meta.touched) {
    message = meta.error;
    if (_.isString(attr.className)) {
      attr.className += meta.valid ? ' is-valid' : ' is-invalid';
    }
  }

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    )]
    );
  }, []);

  // NOTE prepare dropzone controls
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpe, image/jpg, image/jpeg, image/gif, image/png',
  });

  const images = files.map(({ name, preview }) => <img key={name} className="input-image-picture" src={preview} alt={name} />);

  return <RFControlWrap
    label={label}
    id={input.name}
    message={message}
    usePopover={usePopover}
    className={cn('input-image', classNameFormGroup)}
  >
    <div { ...getRootProps({ className: cn('input-image-container', { active: isDragActive, accept: isDragAccept, reject: isDragReject }) }) }>
      <input { ...getInputProps({ className: 'input-image-control' }) } />
      <p className="input-image-text">Drag and drop some images here, or click to select images</p>
      <div className="input-image-content">{images}</div>
    </div>
  </RFControlWrap>;
};

export default InputCropImage;
