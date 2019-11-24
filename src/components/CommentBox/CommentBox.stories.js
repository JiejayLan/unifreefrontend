import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { CommentBox } from './CommentBox';

storiesOf('Forms', module)
  .add('CommentBox',
    withInfo({
      text: 'description: Component for commenting posts',
      inline: false,
      source: false,
    })(() => (
      <>
        <h2>Sample post</h2>
        <CommentBox />
      </>
    )),
    {
      notes: 'note',
    });
