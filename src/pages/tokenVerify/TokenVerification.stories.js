import React from 'react';
import { storiesOf } from '@storybook/react';
import { TokenVerification } from './TokenVerification';

storiesOf('Pages', module).add('Token Verification Page', () => <TokenVerification />, {
  notes: 'Verify Token Page',
});
