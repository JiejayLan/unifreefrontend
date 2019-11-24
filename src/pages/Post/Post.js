import React from 'react';
import { IndividualPost } from '../../components/Posts/IndividualPost';
import { StateProvider } from '../../components/StateProvider';

export const Post = () => {
  const initialState = {
    post: {
      label: 'general',
      title: '',
      content: '',
      updatedAt: '',
      username: '',
      postID: 1,
      posterID: 1,
    },
    comments: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 1 },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changePost':
        return {
          ...state,
          post: action.newPost,
        };
      case 'changeComment':
        return {
          ...state,
          comments: action.newComments,
        };
      case 'changePage':
        return {
          ...state,
          page: { ...state.page, ...action.newPage },
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
