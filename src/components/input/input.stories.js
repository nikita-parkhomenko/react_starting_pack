
// outsource dependencies
import React from 'react';
import { Field } from 'redux-form';

// local dependencies
import Input from '../input';
import { WrappedConnectedReduxForm } from '../redux-form-helpers/form-control-helper';

export default {
  title: 'Components/Input',
  component: Input,
  decorators: [story => <WrappedConnectedReduxForm initialValues={{ test1: null, test2: 0 }}>
    {story()}
  </WrappedConnectedReduxForm>]
};

export const InputText = args => <Field
  {...args}
  label={<code> {'<Field name="test1" component={Input} usePopover="bottom" />'} </code>}
/>;

InputText.args = {
  type: 'text',
  name: 'test1',
  component: Input,
  usePopover: 'bottom',
};

export const InputNumber = args => <Field
  {...args}
  filter={value => Number(value) || 0}
  label={<code> {'<Field type="number" skipTouch name="test1" component={Input} />'} </code>}
/>;

InputNumber.args = {
  max: 10,
  min: -10,
  step: 0.1,
  name: 'test2',
  type: 'number',
  skipTouch: true,
  component: Input
};
