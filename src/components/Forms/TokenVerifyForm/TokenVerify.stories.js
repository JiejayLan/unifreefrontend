import React from 'react';
import { storiesOf } from '@storybook/react';
import { TokenVerifyForm } from './TokenVerifyForm';


storiesOf('Form', module).add('TokenVerify Form', () => <TokenVerifyForm />, {
  notes: 'Verify if the token match the username',
});
