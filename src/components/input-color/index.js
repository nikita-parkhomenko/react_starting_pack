
// outsource dependencies
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { GithubPicker } from 'react-color';
import React, { memo, useState, useCallback, useMemo } from 'react';

// local dependencies
import { RFControlWrap } from '../redux-form-helpers';

// configure
export const COLORS = [
  // NOTE just some colors
  '#555555', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE',
  '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#D9E3F0', '#F47373',
  '#D0021B', '#697689', '#37D67A', '#2CCCE4', '#dce775', '#ff8a65', '#ba68c8'
];

export const InputColor = memo(({
  input, meta, label, skipTouch, usePopover, classNameFormGroup, className, ...attr
}) => {
  const [open, setOpen] = useState(false);

  let message = '', status = '';
  if (skipTouch || !meta.pristine || meta.touched) {
    message = meta.error;
    status = meta.valid ? 'is-valid' : 'is-invalid';
  }
  const handleFocus = useCallback(() => setOpen(true), []);
  const changeColor = useCallback(({ hex }) => input.onChange(hex), [input]);
  const handleChange = useCallback(event => input.onChange(event.target.value), [input]);
  const handleBlur = useCallback(() => setTimeout(() => setOpen(false), 150), []);
  const validColor = useMemo(() => (/^#([0-9a-f]{3,3}|[0-9a-f]{6,6})$/i.test(input.value) ? input.value : '#555555'), [input.value]);

  return <RFControlWrap
    label={label}
    id={input.name}
    message={message}
    usePopover={usePopover}
    className={cn('input-color', classNameFormGroup)}
  >
    <Input
      id={input.name}
      autoComplete="off"
      value={input.value}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      style={{ backgroundColor: validColor }}
      className={cn('input-color-control', className, status)}
      {...attr}
    />
    <div className="input-color-picker-holder">
      { !open ? null : <div className="input-color-picker">
        <GithubPicker
          width={190}
          colors={COLORS}
          onChange={changeColor}
          color={{ hex: validColor }}
        />
      </div> }
    </div>
  </RFControlWrap>;
});

InputColor.propTypes = {
  disabled: PropTypes.bool,
  skipTouch: PropTypes.bool,
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: RFControlWrap.propTypes.label,
  usePopover: RFControlWrap.propTypes.usePopover,
  classNameFormGroup: RFControlWrap.propTypes.className,
};

InputColor.defaultProps = {
  label: null,
  disabled: false,
  skipTouch: false,
  classNameFormGroup: '',
  className: 'form-control',
  usePopover: RFControlWrap.defaultProps.usePopover,
};

export default InputColor;
