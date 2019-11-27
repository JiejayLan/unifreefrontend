import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import StoryRouter from 'storybook-react-router';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import { IndividualPost } from './IndividualPost';
import config from '../../../config';
import { StateProvider } from '../../StateProvider';

const IndividualPosts = () => {
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
      default:
        return state;
    }
  };

  const path = '/api/v1/user/getpostbyid?';
  const domain = config.apiDomain;
  const mocks = new MockAdapter(axios);
  const postIDApi = `https://${domain}${path}`;

  const payLoads = {
    status: 'success',
    data: {
      label: 'sample',
      title: 'sample title',
      content: 'This is a sample content for the sample post with sample title',
      updatedAt: '2019-11-07T09:26:51.822Z',
      username: 'sample',
      postID: 1,
      posterID: 1,
    },
  };

  mocks.onGet(postIDApi).reply(200, payLoads);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <IndividualPost />
    </StateProvider>
  );
};

storiesOf('Post', module)
  .addDecorator(StoryRouter())
  .add('Individual Post',
    withInfo({
      text: 'description: Display a specific post with postID get from URL',
      inline: false,
      source: false,
    })(() => (
      <MemoryRouter>
        <IndividualPosts />
      </MemoryRouter>
    )));
