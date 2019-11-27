import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CommentInput } from './CommentInput';

storiesOf('Form', module)
  .add('CommentBox',
    withInfo({
      text: 'description: Component for commenting posts',
      inline: false,
      source: false,
    })(() => (
      <>
        <h2>Sample post</h2>
        <CommentInput />
      </>
    )),
    {
      notes: 'This components is a textarea for users to write and post commments.'
      + 'max number of lines = 5. This component utilizes the postComment functionality from the backend',
    });
