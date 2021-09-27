
// outsource dependencies
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const AlertError = memo(({ message, title, active, onClear, ...attr }) => {
  return <Alert color="danger" {...attr} isOpen={Boolean(message)} toggle={!active ? null : onClear}>
    <strong> { title } </strong>
    { message }
  </Alert>;
});
AlertError.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  onClear: PropTypes.func,
  message: PropTypes.string,
  className: PropTypes.string,
};
AlertError.defaultProps = {
  message: null,
  active: false,
  onClear: null,
  title: 'Error: ',
  className: 'animated tada m-2',
};
export default AlertError;
