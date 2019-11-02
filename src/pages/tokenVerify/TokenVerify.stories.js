import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TokenVerify } from './TokenVerify';

storiesOf('Pages', module).add(
  'Token Verification Page',
  withInfo({
    test: 'description: Verify Token Page',
    inline: false,
    source: false,
  })(() => <TokenVerify />, {
    notes: 'Verify Token Page, import the Verify Token Form',
  }),
);
