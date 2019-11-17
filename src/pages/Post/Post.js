import React from 'react';
import { IndividualPost } from '../../components/Posts/IndividualPost';
import { StateProvider } from '../../components/StateProvider';

export const Post = () => {
  const initialState = {
    post: {
      label: 'sample',
      title: 'sample title',
      content: 'This is a sample content for the sample post with sample title',
      updatedAt: '2019-11-07T09:26:51.822Z',
      username: 'sampleMe',
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
