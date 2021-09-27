// outsource dependencies
import React from 'react';

// local dependencies
import { FasIcon } from './index';

export default {
  title: 'Components/Icons',
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    icon: {
      options: ['envelope', 'search', 'cog', 'times', 'sign-out-alt'],
      control: { type: 'select' }
    }
  }
};

export const Icon = args => <div className="align-self-start mr-3">
  <FasIcon {...args} />
</div>;

Icon.args = {
  className: 'text-success',
};
