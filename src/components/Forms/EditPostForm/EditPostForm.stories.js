import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { EditPostForm } from './EditPostForm';
import { StateProvider } from '../../StateProvider';

const initialState = {
  post: {
    label: 'sample',
    title: 'sample',
    content: 'sample',
    updatedAt: '',
    username: '',
    postID: 1,
    posterID: 1,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'changePost':
      return {
        ...state,
        post: action.newPost,
      };
    default:
      return state;
  }
};

storiesOf('Form', module)
  .add('Edit Post Form',
    withInfo({
      text: 'description: User create post with appropriate label, contents, and title',
      inline: false,
      source: false,
    })(() => (
      <StateProvider initialState={initialState} reducer={reducer}>
        <EditPostForm />
      </StateProvider>
    )));
