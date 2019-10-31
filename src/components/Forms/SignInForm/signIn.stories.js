import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { SignInForm } from './SignInForm';

storiesOf('Form', module)
  .add('SignIn Form',
    withInfo({
      text: 'description: User login with username and password',
      inline: false,
      source: false,
    })(() => <SignInForm />));
