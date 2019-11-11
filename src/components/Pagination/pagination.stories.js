import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Pagination } from './Pagination';
import { StateProvider } from '../StateProvider';

const Home = () => {
  const initialState = {
    posts: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 10 },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changePage':
        return {
          ...state,
          page: { ...state.page, ...action.newPage },
        };
      case 'changePosts':
        return {
          ...state,
          posts: action.newPosts,
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Pagination />
    </StateProvider>
  );
};


storiesOf('Pagination', module)
  .add('Home page pagintaion',
    withInfo({
      text: 'description: A pagination component, it can allow user to switch page and change pageSize',
      inline: false,
      source: false,
    })(() => <Home />));
