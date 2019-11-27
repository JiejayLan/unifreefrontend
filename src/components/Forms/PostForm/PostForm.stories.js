import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { PostForm } from './PostForm';

storiesOf('Form', module)
  .add('Post Form',
    withInfo({
      text: 'description: Post form with label, contents, and title textfields',
      inline: false,
      source: false,
    })(() => <PostForm />));
