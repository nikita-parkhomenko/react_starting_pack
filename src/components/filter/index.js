
// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';

// local dependencies
import FilterService from '../../services/filter.service';

export const Filter = memo(({ type, options, value, as: As, ...attr }) => {
  const filterResult = useMemo(() => {
    const filter = _.isFunction(type) ? type : () => `Incorrect filter ${String(type)}`;
    return filter(value, options);
    // NOTE Expected behavior to not watch options prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, type]);

  return <As {...attr}> { filterResult } </As>;
});
Filter.propTypes = {
  as: PropTypes.string,
  options: PropTypes.object,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Filter.defaultProps = {
  value: '',
  as: 'span',
  options: {},
  type: FilterService.humanize,
};
export default Filter;

// filter shortcuts
export const Humanize = props => <Filter {...props} />;
export const Enum = props => <Filter {...props} type={FilterService.toEnum} />;
export const Truncate = props => <Filter {...props} type={FilterService.truncate} />;
export const Duration = props => <Filter {...props} type={FilterService.duration} />;
export const EscapeHtml = props => <Filter {...props} type={FilterService.escapeHtml} />;

// as part of filters
export const UnsafeHtml = memo(({ value, as: As, ...attr }) => <As {...attr} dangerouslySetInnerHTML={{ __html: value || '' }} />);
UnsafeHtml.propTypes = {
  as: PropTypes.string,
  value: PropTypes.string.isRequired,
};
UnsafeHtml.defaultProps = {
  as: 'span',
};
