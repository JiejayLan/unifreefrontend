import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ErrorMessage } from './ErrorMessage';

storiesOf('/Error Message', module)
  .add('default',
    withInfo({
      text: 'description: User login with username and password',
      inline: false,
      source: false,
    })(() => <ErrorMessage />),
    {
      notes: 'note',
    });
