import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { SignUpForm } from './SignUpForm';

storiesOf('Form', module)
  .add('SignIn Form',
    withInfo({
      text: 'description: User login with username and password',
      inline: false,
      source: false,
    })(() => <SignUpForm />));
