import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { SignUp } from './SignUp';

storiesOf('Pages', module)
  .add('SignUp Page',
    withInfo({
      text: 'description: User sign up with email, username and password',
      inline: false,
      source: false,
    })(() => <SignUp />));
