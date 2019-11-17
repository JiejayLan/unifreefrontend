import React from 'react';
import { IndividualPost } from '../../components/Posts/IndividualPost';
import { StateProvider } from '../../components/StateProvider';

export const Post = () => {
  const initialState = {
    post: {
      label: '',
      title: '',
      content: '',
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

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <IndividualPost />
    </StateProvider>
  );
};
