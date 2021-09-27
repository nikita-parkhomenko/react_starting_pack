
// outsource dependencies
import React from 'react';
import { Field } from 'redux-form';

// local dependencies
import Radio from './index';
import { WrappedConnectedReduxForm } from '../redux-form-helpers/form-control-helper';

export default {
  title: 'Components/Input Radio',
  component: Radio,
};

export const RadioControl = () => <WrappedConnectedReduxForm initialValues={{ test1: null, test2: null }}>
  <Field
    name="test1"
    component={Radio}
    label={<code> {'<Field name="test1" component={Radio} options={list} />'} </code>}
    options={[
      { label: 'One radio', value: 1 },
      { label: 'Two radio', value: 2 },
      { label: 'Three radio', value: 3 },
      { label: 'Four radio', value: 4 },
    ]}
  />
  <Field
    skipTouch
    name="test2"
    component={Radio}
    label={<code> {'<Field skipTouch name="test1" component={Radio} options={list} />'} </code>}
    options={[
      { label: 'One radio', value: 1 },
      { label: 'Two radio', value: 2 },
      { label: 'Three radio', value: 3 },
      { label: 'Four radio', value: 4 },
    ]}
  />
</WrappedConnectedReduxForm>;
