import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
import { ViewReplies } from './ViewReplies';

const replies = [
  {
    content: 'This is a sample content for replies',
    username: 'sampleMe',
    createdAt: '2019-11-07T09:26:51.822Z',
  },
  {
    content: 'This is another sample content for replies',
    username: 'sampleMe2',
    createdAt: '2019-12-07T09:26:51.822Z',
  },
];

storiesOf('Replies', module)
  .add('ViewReplies',
    withInfo({
      text: 'description: Display all replies for a comment',
      inline: false,
      source: false,
    })(() => (
      <ViewReplies replies={replies} commentID={233} />
    )),
    { notes: 'Display replies if there are replies, otherwise, nothing is rendered' });
