import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import StoryRouter from 'storybook-react-router';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { IndividualPost } from './IndividualPost';
import config from '../../../config';
import { StateProvider } from '../../StateProvider';

const IndividualPosts = () => {
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

  const path = '/api/v1/user/getpostbyid?';
  const domain = config.apiDomain;
  const mocks = new MockAdapter(axios);
  const postIDApi = `https://${domain}${path}`;

  const payLoads = {
    status: 'success',
    data: {
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
    })(() => <IndividualPosts />));
