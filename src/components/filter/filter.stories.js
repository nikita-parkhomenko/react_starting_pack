// outsource dependencies
import React from 'react';

// local dependencies
import Filter, { Truncate, Humanize, EscapeHtml, UnsafeHtml, Enum } from './index';

export default {
  title: 'Components/Filters',
  component: Filter,
};

export const HumanizeExample = args => <Humanize {...args} />;
HumanizeExample.args = {
  as: 'h2',
  value: 'SOME_VALUE',
  className: 'text-center text-gray-dark',
};

export const TruncateExample = args => <Truncate {...args} />;
TruncateExample.args = {
  ...HumanizeExample.args,
  options: { length: 30 },
  value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
};

export const EnumExample = args => <Enum {...args} />;
EnumExample.args = {
  ...HumanizeExample.args,
  value: '! Make enum from text =)'
};

export const EscapeHtmlExample = args => <EscapeHtml {...args} />;
EscapeHtmlExample.args = {
  ...HumanizeExample.args,
  value: '<hr /><h1> Hello world <code>!!!</code></h1><hr />'
};

export const UnsafeHtmlExample = args => <UnsafeHtml {...args} />;
UnsafeHtmlExample.args = {
  ...EscapeHtmlExample.args,
};
