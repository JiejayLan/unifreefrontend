import React from 'react';
import { storiesOf } from '@storybook/react';
import { TokenVerifyPage } from './TokenVerifyPage';


storiesOf('Form', module).add('TokenVerify Form', () => <TokenVerifyPage />, {
  notes: 'Verify if the token match the username',
});
