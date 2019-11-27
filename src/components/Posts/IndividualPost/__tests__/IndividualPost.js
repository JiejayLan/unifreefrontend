import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { IndividualPost } from '../IndividualPost';
import { serviceRequest } from '../../../../services/serviceRequest';
import { StateProvider } from '../../../StateProvider';

jest.mock('../../../../services/serviceRequest');

const comments = {
  commentID: 1,
  commenterID: 1,
  content: 'testing content',
  numReply: 0,
  createdAt: '2019-11-17T05:20:04.292Z',
  username: 'user',
};

describe('Individual Post test', () => {
  const initialState = {
    post: {
      label: 'general',
      title: '',
      content: '',
      updatedAt: '',
      username: '',
      postID: 1,
      posterID: 1,
      obsolete: '',
    },
    comments: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 1 },
  };

  const mockReducer = jest.fn();

  const successPayLoad = {
    status: 'success',
    data: {
      post: {
        label: 'sample',
        title: 'sample title',
        content: 'This is a sample content for the sample post with sample title',
        updatedAt: '2019-11-07T09:26:51.822Z',
        username: 'sample',
        postID: 1,
        obsolete: false,
      },
      comments,
      currentPage: 1,
      totalPages: 10,
    },
  };

  const successPayLoadObsoleteTrue = {
    status: 'success',
    data: {
      post: {
        label: 'sample',
        title: 'sample title',
        content: 'This is a sample content for the sample post with sample title',
        updatedAt: '2019-11-07T09:26:51.822Z',
        username: 'sample',
        postID: 1,
        obsolete: true,
      },
      comments,
      currentPage: 1,
      totalPages: 10,
    },
  };

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('should render without crash', () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const { baseElement } = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <IndividualPost />
      </StateProvider>,
    );

    expect(baseElement.outerHTML).toBeDefined();
  });

  it('should should redirect when obsolete is true', async () => {
    serviceRequest.mockReturnValue(successPayLoadObsoleteTrue);
    const { baseElement } = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <IndividualPost />
      </StateProvider>,
    );
    await new Promise((_) => setTimeout(_, 100));
    expect(expect(baseElement.outerHTML).toBe('<body><div></div></body>'));
  });
});
