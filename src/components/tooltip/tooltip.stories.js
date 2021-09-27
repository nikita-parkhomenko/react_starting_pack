
// outsource dependencies
import React from 'react';
import { Button } from 'reactstrap';

// local dependencies
import Tooltip from './index';

export default {
  title: 'Components/Tooltip',
  argTypes: {
    placement: {
      options: ['auto', 'top', 'right', 'bottom', 'left'],
      control: { type: 'radio' }
    }
  },
  decorators: [story => <div className="container" style={{ textAlign: 'center', padding: 50 }}>{story()}</div>]
};

export const TooltipExample = args => <Tooltip as="span" {...args}>
  <Button color="info">Info</Button>
</Tooltip>;

TooltipExample.args = {
  message: 'Info message',
  isOpen: true,
};
