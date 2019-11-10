import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { IndividualPost } from './IndividualPost';

storiesOf('Post', module)
  .add('Individual Post',
    withInfo({
      text: 'description: Display a specific post with postID get from URL',
      inline: false,
      source: false,
    })(() => <IndividualPost />));
