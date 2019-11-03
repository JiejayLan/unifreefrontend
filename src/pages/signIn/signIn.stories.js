import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { SignIn } from './SignIn';

storiesOf('Pages', module).add('Signin Page', withInfo({
  text: 'description: Sign Page',
  inline: false,
  source: false,
})(() => (
  <SignIn />
)));
