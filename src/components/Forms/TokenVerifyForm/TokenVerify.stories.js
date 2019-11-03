import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TokenVerifyForm } from './TokenVerifyForm';

storiesOf('Form', module)
  .add('TokenVerify Form',
    withInfo({
      text: 'description: User verify account with username and token',
      inline: false,
      source: false,
    })(() => (
      <TokenVerifyForm />
    )),
    { notes: 'Verify if the token match the username, then redirect to login page' });
