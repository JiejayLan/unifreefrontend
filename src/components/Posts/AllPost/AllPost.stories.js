import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { AllPost } from './AllPost';

storiesOf('Post', module)
  .add('All posts',
    withInfo({
      text: 'description: Display all post on the home page',
      inline: false,
      source: false,
    })(() => <AllPost />));
