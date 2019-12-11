import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Label } from './Label';

storiesOf('Label', module)
  .add('Label Tag',
    withInfo({
      text: 'description: Label Attached to forms and comments',
      inline: false,
      source: false,
    })(() => <Label />));
