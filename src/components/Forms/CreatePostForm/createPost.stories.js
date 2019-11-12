import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CreatePostForm } from './CreatePostForm';

storiesOf('Form', module)
  .add('Create Post Form',
    withInfo({
      text: 'description: User create post with appropriate label, contents, and title',
      inline: false,
      source: false,
    })(() => <CreatePostForm />));
