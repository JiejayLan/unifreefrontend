import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { MemoryRouter } from 'react-router-dom';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
import { AllPost } from './AllPost';
import { StateProvider } from '../../StateProvider';

export const initialState = {
  posts: [],
  page: { pageSize: 25, currentPage: 1, totalPages: 1 },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'changePage':
      return {
        ...state,
        page: action.newPage,
      };
    case 'changePosts':
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};

storiesOf('Post', module)
  .addDecorator(StoryRouter())
  .add('All posts',
    withInfo({
      text: 'description: Display all post on the home page',
      inline: false,
      source: false,
    })(() => (
      <MemoryRouter>
        <StateProvider initialState={initialState} reducer={reducer}>
          <AllPost />
        </StateProvider>
      </MemoryRouter>
    )),
    { notes: 'MemoryRouter used to prevent invariant error.' });
