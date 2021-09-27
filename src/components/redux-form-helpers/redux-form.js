/* eslint-disable react/no-unused-prop-types */

// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Form, reduxForm } from 'redux-form';

// local dependencies

const FormContent = memo((({ children, onSubmit, handleSubmit, className, autoComplete }) => <Form
  className={className}
  autoComplete={autoComplete}
  onSubmit={handleSubmit(onSubmit)}
>
  { children }
</Form>));
FormContent.propTypes = {
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  initialValues: PropTypes.object,
  form: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
FormContent.defaultProps = {
  className: null,
  autoComplete: 'off',
  initialValues: {},
};

/**
 *
 * @see https://redux-form.com/8.2.2/docs/api/reduxform.md
 * @typedef {Object} ReduxFormProps
 * @property {Object} [initialValues={}]
 * @property {Boolean} [destroyOnUnmount=false]
 * @property {Boolean} [enableReinitialize=false]
 * @property {String} [form] FORM_NAME
 * @property {Function} [onSubmit]
 * @example
    onSubmit: formData => console.log('%c RF.onSubmit ', 'color: #000000;'
        , '\n formData: ', formData
    ),
 * @property {Function} [validate]
 * @example
    validate: (values, meta) => console.log('%c RF.validate ', 'color: #000000;'
        , '\n values: ', values
        , '\n meta: ', meta
    ),
 */

/**
 *
 * NOTE provide ability to set redux-form props without passing that props to DOM element
 * @param {ReduxFormProps} options
 * @return {Boolean}
 */
export const ReduxForm = reduxForm({})(FormContent);
