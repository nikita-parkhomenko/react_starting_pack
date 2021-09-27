
// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Button, Modal } from 'reactstrap';
import React, { PureComponent } from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';

// local dependencies
import { Humanize } from '../filter';

// configure
const toPercent = value => Number(Number(value).toFixed(4));

class ImageCropModal extends PureComponent {
    static propTypes = {
      show: PropTypes.bool,
      crop: PropTypes.object,
      title: PropTypes.string,
      onApply: PropTypes.func,
      onDismiss: PropTypes.func,
      minWidth: PropTypes.number,
      maxWidth: PropTypes.number,
      minHeight: PropTypes.number,
      maxHeight: PropTypes.number,
      value: PropTypes.string.isRequired,
      handleHide: PropTypes.func.isRequired,
    };

    static defaultProps = {
      crop: {},
      show: false,
      title: null,
      minWidth: 10,
      minHeight: 10,
      maxWidth: 101,
      maxHeight: 101,
      onApply: e => e,
      onDismiss: e => e
    };

    constructor (props, context) {
      super(props, context);
      this.state = {
        invalid: false,
        image: props.value,
        crop: {}
      };
    }

    isCropInvalid ({ width, height }) {
      const { minWidth, minHeight, maxWidth, maxHeight } = this.props;
      if (!_.isNumber(width) || !_.isNumber(height)) { return 'Please select image area'; }
      if (width < minWidth || width > maxWidth) { return 'The selection should be wider ...'; }
      if (height < minHeight || height > maxHeight) { return 'The selection should be higher ...'; }
      return false;
    }

    handleApply = e => {
      const { crop } = this.state;
      const { onApply, handleHide } = this.props;
      onApply({
        x: toPercent(crop.x/100),
        y: toPercent(crop.y/100),
        width: toPercent(crop.width/100),
        height: toPercent(crop.height/100),
      });
      handleHide(e);
    };

    handleDismiss = e => {
      const { onDismiss, handleHide } = this.props;
      onDismiss({ message: 'DISMISS' });
      handleHide(e);
    };

    handleChange = crop => this.setState({ crop, invalid: this.isCropInvalid(crop) });

    handleLoad = image => {
      const options = _.defaults(this.props.crop, { x: 25, y: 25, aspect: 1, width: 50, height: 50 });
      this.handleChange(makeAspectCrop(options, image.width / image.height));
    };

    // componentDidMount = () => console.log(
    //     '%c ImageCropModal.componentDidMount ', 'color: #fff; background: #232323; font-size: 12px;'
    //     , '\n state:', this.state
    //     , '\n props:', this.props
    // );

    render () {
      const { show, title } = this.props;
      const { image, crop, invalid } = this.state;
      return <Modal isOpen={show} toggle={this.handleDismiss}>
        <div className="p-4">
          { !title ? null : <Humanize as="h2" className="text-center text-gray-dark" value={title} />}
          <div className="mb-3 text-center">
            <ReactCrop
              src={image}
              crop={crop}
              onChange={this.handleChange}
              onImageLoaded={this.handleLoad}
              imageStyle={{ maxHeight: 'none' }}
            />
          </div>
          { !invalid ? null : <p className="text-danger mb-3"> { invalid } </p> }
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <Button color="secondary" onClick={this.handleDismiss}> Cancel </Button>
            </div>
            <div className="d-flex flex-column">
              <Button color="success" disabled={invalid} onClick={this.handleApply}> Save </Button>
            </div>
          </div>
        </div>
      </Modal>;
    }
}

export default ImageCropModal;
