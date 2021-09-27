// outsource dependencies
import React from 'react';
import { Field } from 'redux-form';

// local dependencies
import InputColor from './index';
import { WrappedConnectedReduxForm } from '../redux-form-helpers/form-control-helper';

export default {
  title: 'Components/Input Color',
  component: InputColor,
};

export const ColorPicker = args => <WrappedConnectedReduxForm initialValues={{ test1: '#555555', test2: '#f8e71c' }}>
  <Field
    name="test1"
    usePopover="right"
    component={InputColor}
    label={<code> {'<Field name="test1" usePopover="right" component={InputColor} />'} </code>}
  />
  <Field
    name="test2"
    component={InputColor}
    label={<code> {'<Field name="test2" component={InputColor} />'} </code>}
  />
  <Field
    name="test3"
    component={InputColor}
    label={<code> {'<Field name="test3" component={InputColor} />'} </code>}
  />
</WrappedConnectedReduxForm>;
