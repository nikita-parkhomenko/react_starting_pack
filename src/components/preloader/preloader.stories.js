
// outsource dependencies
import React from 'react';
import { Button } from 'reactstrap';

// local dependencies
import { BoxLoader, Spinner } from './index';

export default {
  title: 'Components/Preloader',
  component: BoxLoader,
};
// BoxLoader component
export const Preloader = args => <BoxLoader {...args} />;

Preloader.args = { active: true };

// Spinner component
export const SpinnerBtn = args => <Button color="primary">
  Button
  <Spinner {...args} />
</Button>;

SpinnerBtn.args = { active: true };
