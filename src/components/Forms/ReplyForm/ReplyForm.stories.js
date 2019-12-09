import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ReplyForm } from './ReplyForm';

storiesOf('Form', module)
  .add('ReplyForm',
    withInfo({
      text: 'description: Component for replying to a comment',
      inline: false,
      source: false,
    })(() => (
      <>
        <h2>Sample Reply Form</h2>
        <br />
        <ReplyForm />
      </>
    )),
    {
      notes: 'This components is a textarea for users to reply to a specific comment.'
      + 'The reply length is limit to 500 characters.'
      + 'This component utilizes the replyComment functionality from the backend',
    });
