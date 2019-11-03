import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Home } from './Home';

export const Default = () => <Home />;
storiesOf('Pages', module).add('Home Page', withInfo({
  text: 'description: Home Page',
  inline: false,
  source: false,
})(() => (
  <Home />
)));
