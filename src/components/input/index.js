
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import React, { useCallback, memo } from 'react';

// local dependencies
import { RFControlWrap } from '../redux-form-helpers';

export const RFInput = memo(props => {
  const { input, type, meta, label, skipTouch, usePopover, classNameFormGroup, filter, className, ...attr } = props;
  // NOTE prepare input actions
  const handleBlur = useCallback(event => input.onBlur(filter(event.target.value)), [input, filter]);
  const handleChange = useCallback(event => input.onChange(filter(event.target.value)), [input, filter]);
  // NOTE handle valid/invalid state and error message for input
  let message = '';
  if (skipTouch || meta.touched) {
    message = meta.error;
    attr.className += meta.valid ? ' is-valid' : ' is-invalid';
  }
  return <RFControlWrap
    label={label}
    id={input.name}
    message={message}
    usePopover={usePopover}
    className={cn('input-field', classNameFormGroup)}
  >
    <Input
      dir="auto"
      type={type}
      id={input.name}
      autoComplete="off"
      {...input}
      {...attr}
      onBlur={handleBlur}
      onChange={handleChange}
      className={cn('input-field-control', className)}
    />
  </RFControlWrap>;
});
RFInput.propTypes = {
  type: PropTypes.string,
  filter: PropTypes.func,
  skipTouch: PropTypes.bool,
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: RFControlWrap.propTypes.label,
  usePopover: RFControlWrap.propTypes.usePopover,
  classNameFormGroup: RFControlWrap.propTypes.className,
};
RFInput.defaultProps = {
  label: null,
  type: 'text',
  className: '',
  filter: e => e,
  skipTouch: false,
  usePopover: null,
  classNameFormGroup: '',
};

export default RFInput;
