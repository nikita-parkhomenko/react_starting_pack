
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { CustomInput } from 'reactstrap';

// local dependencies
import { RFControlWrap } from '../redux-form-helpers';

export const InputRadio = memo(({
  input, meta, label, options, skipTouch, usePopover, classNameFormGroup,
  className, getOptionValue, getOptionLabel, ...attr
}) => {

  const message = (skipTouch || meta.touched) ? meta.error : null;
  return <RFControlWrap
    label={label}
    id={input.name}
    message={message}
    usePopover={usePopover}
    className={cn('input-radio', classNameFormGroup)}
  >
    { (options || []).map((item) => <CustomInput
      { ...attr }
      type="radio"
      key={item.value}
      name={input.name}
      onChange={input.onChange}
      value={getOptionValue(item)}
      label={getOptionLabel(item)}
      id={`radio-${input.name}-${item.value}`}
      checked={getOptionValue(item) == input.value}
      className={cn('input-radio-control', className)}
    />)}
  </RFControlWrap>;
});

InputRadio.propTypes = {
  skipTouch: PropTypes.bool,
  className: PropTypes.string,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  label: RFControlWrap.propTypes.label,
  usePopover: RFControlWrap.propTypes.usePopover,
  classNameFormGroup: RFControlWrap.propTypes.className,
};

InputRadio.defaultProps = {
  label: null,
  className: '',
  skipTouch: false,
  usePopover: null,
  classNameFormGroup: '',
  getOptionLabel: e => e.label,
  getOptionValue: e => e.value,
};

export default InputRadio;
