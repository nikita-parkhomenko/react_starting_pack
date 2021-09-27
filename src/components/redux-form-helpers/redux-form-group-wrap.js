
// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';

// local dependencies

const Error = memo(({ message }) => !message ? null : <h4 className="w-100 text-center pt-2 text-danger">
  { message }
</h4>);
Error.propTypes = {
  message: PropTypes.string,
};
Error.defaultProps = {
  message: null,
};

export const ReduxFormGroupWrap = memo(({ View, getKey, ...props }) => {
  // NOTE props from the fieldArray
  const { meta, fields } = props;
  // NOTE prepare fields
  const items = useMemo(() => fields.map((mKey, index) => {
    const value = fields.get(index);
    return ({ value, mKey, index, key: getKey(value, index) });
  }), [fields, getKey]);

  return <>
    <Error message={meta.error} />
    {/* NOTE Key sets from attr */}
    {/* eslint-disable-next-line react/jsx-key */}
    { items.map(attr => <View {...props} {...attr} />) }
  </>;
});
ReduxFormGroupWrap.propTypes = {
  getKey: PropTypes.func,
  meta: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  View: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
ReduxFormGroupWrap.defaultProps = {
  getKey: (value, index) => index,
};
