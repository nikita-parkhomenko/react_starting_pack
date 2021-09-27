
// outsource dependencies
import _ from 'lodash';
import React, { useEffect } from 'react';
// import { connectModal, show } from 'redux-modal';
import { connectModal, show } from '../redux-modal';

// local dependencies
import CropModal from './modal';
import CropInput from './input';
import { store } from '../../store';
import { IMG_DIR } from '../../constants/spec';
import { instanceAPI } from '../../services/request.service';

// configure
const MODAL_NAME = 'IMAGE_CROP_MODAL';
const openImageCropModal = options => store.dispatch(show(MODAL_NAME, options));

// const FileUpload = ({ file }) => {
//   useEffect(() => {
//     const url = await uploadFile(file);
//   }, []);
//   return <div>file upload</div>;
// };

/**
 * create image from file
 *
 * @param {File} file
 * @returns {Promise}
 */
export const fileToDataUrl = file => new Promise(resolve => {
  const reader = new FileReader();
  reader.addEventListener('load', () => resolve(reader.result), false);
  reader.readAsDataURL(file);
});

/**
 * upload file
 *
 * @param {File} file
 * @param {String} dir
 * @param {Object} params
 * @returns {Promise}
 */
export const uploadFile = (file, dir = IMG_DIR.DEFAULT, params) => {
  const data = new FormData();
  // NOTE allowed for names only ASCII
  const fileName = !_.isString(file.name) ? 'image' : file.name.replace(/[^\d|A-Z|a-z]/g, '_').replace(/_+/g, '_');
  data.append('dir', dir);
  data.append('file', file, fileName || 'image');
  return instanceAPI({
    data,
    params,
    method: 'POST',
    url: 'images/upload',
    headers: { 'content-type': 'multipart/form-data' }
  });
};

/**
 * open modal window to edit image
 *
 * @param {File} file
 * @param {Object} options
 * @returns {Promise}
 */
export const showModal = (file, options) => new Promise((resolve, reject) => {
  fileToDataUrl(file)
    .then(value => openImageCropModal({
      value,
      onDismiss: reject,
      onApply: crop => uploadFile(file, options.dir, crop).then(resolve).catch(reject),
      ...options,
    }))
    .catch(reject);
});

/**
 * Common popup with "image crop" functionality. Should be connected to app globally
 */
export const Modal = connectModal({ name: MODAL_NAME })(CropModal);

/**
 * Common image crop input component
 */
export default CropInput;
export const Input = CropInput;
