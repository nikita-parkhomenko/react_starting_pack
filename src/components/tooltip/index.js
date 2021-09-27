
// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import TooltipTrigger from 'react-popper-tooltip';

// NOTE Show form error using prepared popover
export const Tooltip = memo(({
  message, placement, children, trigger, popoverClasses, as: As, ...attr
}) => {
  const tooltip = useMemo(() => ({
    getTooltipProps, getArrowProps, tooltipRef, arrowRef, placement
  }) => <div
    {...getTooltipProps({ ref: tooltipRef, className: 'tooltip-container p-0' })}
  >
    <div {...getArrowProps({ ref: arrowRef, 'data-placement': placement, className: 'tooltip-arrow' })} />
    <div className={`popover-body ${popoverClasses}`}> { message } </div>
  </div>, [message, popoverClasses]);
  if (!message) {
    return children;
  }
  // TODO add control of visibility from outside
  return <TooltipTrigger
    {...attr}
    trigger={trigger}
    tooltip={tooltip}
    placement={placement}
  >
    { ({ getTriggerProps, triggerRef }) => <As { ...getTriggerProps({ ref: triggerRef })}>
      { children }
    </As> }
  </TooltipTrigger >;
});

Tooltip.propTypes = {
  as: PropTypes.string,
  popoverClasses: PropTypes.string,
  children: PropTypes.node.isRequired,
  trigger: PropTypes.oneOf(['click', 'right-click', 'hover', 'focus']),
  placement: PropTypes.oneOf(['auto', 'top', 'right', 'bottom', 'left']),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
};

Tooltip.defaultProps = {
  as: 'div',
  message: null,
  trigger: 'hover',
  placement: 'auto',
  popoverClasses: '',
};

export default Tooltip;
