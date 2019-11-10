import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { MemoryRouter } from 'react-router-dom';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AllPost } from './AllPost';
import { StateProvider } from '../../StateProvider';
import config from '../../../config';

const path = '/api/v1/user/getposts?';
const domain = config.apiDomain;
const mock = new MockAdapter(axios);
const API_REQUEST = `https://${domain}${path}`;

export const initialState = {
  posts: [],
  page: { pageSize: 10, currentPage: 1, totalPages: 1 },
};

export const reducer = (state, action) => {
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

const preparePayLoad = () => {
  const singlePost = {
    canEdit: true,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    createdAt: '2019-11-10T15:40:29.201Z',
    label: 'general',
    obsolete: false,
    postID: 183,
    posterID: 55,
    title: 'Lorem Ipsum',
    updatedAt: '2019-11-10T15:40:29.201Z',
    username: 'jielan3',
  };

  const posts = new Array(10).fill(singlePost);

  const payLoad = {
    status: 'success',
    data: {
      currentPage: 1,
      totalPages: 10,
      posts,
    },
  };

  return payLoad;
};

storiesOf('Post', module)
  .addDecorator(StoryRouter())
  .add('All posts',
    withInfo({
      text: 'description: Display all post on the home page',
      inline: false,
      source: false,
    })(() => {
      mock.onGet(API_REQUEST).reply(200, preparePayLoad());
      return (
        <MemoryRouter>
          <StateProvider initialState={initialState} reducer={reducer}>
            <AllPost />
          </StateProvider>
        </MemoryRouter>
      );
    }),
    { notes: 'MemoryRouter used to prevent invariant error.' });
