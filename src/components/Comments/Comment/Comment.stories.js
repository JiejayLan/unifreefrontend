import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
import { Comment } from './Comment';

const singleComment = {
  commentID: 1,
  commenterID: 2,
  content: 'Nice job done',
  numReply: 0,
  createdAt: '2019-11-17T05:20:04.292Z',
  username: 'user',
};

storiesOf('Comment', module)
  .add('Comment',
    withInfo({
      text: 'description: display username, content, createdAt and avatar',
      inline: false,
      source: false,
    })(() => (
      <Comment comment={singleComment} />
    )),
    { notes: 'A child component of ViewComments. This component only renders when there exists at least one comment' });
