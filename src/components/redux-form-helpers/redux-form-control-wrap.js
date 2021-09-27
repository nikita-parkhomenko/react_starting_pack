
// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import Popover from 'react-popper-tooltip';
import { FormGroup, Label } from 'reactstrap';

/**
 * Show form error using prepared popover
 */
export const PopoverError = memo(({ message, usePopover, children, ...attr }) => {
  const tooltipShown = Boolean(message) && Boolean(usePopover);
  const tooltip = useMemo(() => ({ getTooltipProps, getArrowProps, tooltipRef, arrowRef, placement }) => <div
    {...getTooltipProps({ ref: tooltipRef, className: 'tooltip-container p-0' })}
  >
    <div {...getArrowProps({ ref: arrowRef, 'data-placement': placement, className: 'tooltip-arrow' })} />
    <div className="popover-body text-danger"> { message } </div>
  </div>, [message]);
  return <Popover
    {...attr}
    tooltip={tooltip}
    placement={usePopover}
    tooltipShown={tooltipShown}
  >
    { ({ getTriggerProps, triggerRef }) => <div{ ...getTriggerProps({ ref: triggerRef })}>
      { children }
    </div> }
  </Popover>;
});
PopoverError.propTypes = {
  message: PropTypes.string,
  usePopover: PropTypes.oneOf(['auto', 'top', 'right', 'bottom', 'left']),
};
PopoverError.defaultProps = {
  message: null,
  usePopover: null,
};
/**
 * Show form error using prepared label
 */
export const LabelError = memo(({ message, id }) => !message ? null : <Label htmlFor={id} className="app-invalid-feedback">
  { message }
</Label>);
LabelError.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
};
LabelError.defaultProps = {
  id: null,
  message: null,
};
/**
 * Show form error using prepared error components (bottom label or Popover)
 */
export const ReduxFormControlWrap = memo(({ label, className, message, id, usePopover, children }) => {
  return <PopoverError usePopover={usePopover} message={message}>
    <FormGroup className={className}>
      { !label ? null : <label htmlFor={id}> { label } </label> }
      { children }
      { usePopover ? null : <LabelError id={id} message={message} /> }
    </FormGroup>
  </PopoverError>;
});
ReduxFormControlWrap.propTypes = {
  ...LabelError.propTypes,
  ...PopoverError.propTypes,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.element]),
};
ReduxFormControlWrap.defaultProps = {
  ...LabelError.defaultProps,
  ...PopoverError.defaultProps,
  label: null,
  className: '',
};
