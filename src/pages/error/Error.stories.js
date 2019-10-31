import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Error } from './Error';

export const Default = () => <Error />;
storiesOf('Pages', module).add('Error Page', withInfo({
  text: 'description: If user enter an invalid path, it wwill redirect to this page',
  inline: false,
  source: false,
})(() => (
  <Error />
)));
