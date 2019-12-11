import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-notes';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ViewComments } from './ViewComments';
import { StateProvider } from '../../StateProvider';
import config from '../../../config';

const ViewComment = () => {
  const path = '/api/v1/post/viewcomments?';
  const domain = config.apiDomain;
  const mock = new MockAdapter(axios);
  const API_REQUEST = `https://${domain}${path}`;

  const initialState = {
    comments: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 1 },
  };

  const reducer = (state, action) => {
    switch (action.type) {
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

  const preparePayLoad = () => {
    const singleComment = {
      commentID: 1,
      commenterID: 1,
      content: 'Nice job done',
      numReply: 0,
      createdAt: '2019-11-17T05:20:04.292Z',
      username: 'user',
      label: 'university',
    };

    const comments = new Array(10).fill(singleComment);

    const payLoad = {
      status: 'success',
      data: {
        currentPage: 1,
        totalPages: 10,
        pageSize: 7,
        comments,
      },
    };

    return payLoad;
  };

  mock.onGet(API_REQUEST).reply(200, preparePayLoad());

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ViewComments />
    </StateProvider>
  );
};

storiesOf('Comment', module)
  .addDecorator(StoryRouter())
  .add('View Comment',
    withInfo({
      text: 'description: display all the comments of a specific post ID in the IndividualPost page',
      inline: false,
      source: false,
    })(() => (
      <MemoryRouter>
        <ViewComment />
      </MemoryRouter>
    )),
    { notes: 'Display comments if there are comments, otherwise, display \'No Comment\'' });
