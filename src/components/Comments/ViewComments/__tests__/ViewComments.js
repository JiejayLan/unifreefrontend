import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ViewComments } from '../ViewComments';
import { StateProvider } from '../../../StateProvider';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');

const singleComment = {
  commentID: 1,
  commenterID: 1,
  content: 'testing content',
  numReply: 0,
  createdAt: '2019-11-17T05:20:04.292Z',
  username: 'user',
};
const comments = new Array(10).fill(singleComment);

describe('ViewComments component test suits', () => {
  const initialState = {
    comments: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 1 },
  };

  const initialStatesForNoComment = {
    comments: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 0 },
  };

  const mockReducer = jest.fn();

  const successPayLoad = {
    status: 'success',
    data: {
      currentPage: 1,
      totalPages: 10,
      comments,
    },
  };

  const failPayLoad = {
    status: 'success',
    data: {
      currentPage: 1,
      totalPages: 0,
      comments: [],
    },
  };

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('should render without crash when comments existed', () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const { getByText } = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <ViewComments />
      </StateProvider>,
    );
    expect(getByText('COMMENTS')).toBeInTheDocument();
  });

  it('should render without crash when comment do not exist', () => {
    serviceRequest.mockImplementation(async () => (failPayLoad));
    const { getByText } = render(
      <StateProvider initialState={initialStatesForNoComment} reducer={mockReducer}>
        <ViewComments />
      </StateProvider>,
    );
    expect(getByText('No Comment')).toBeInTheDocument();
  });

  it('should catch internal service error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const { getByText } = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <ViewComments />
      </StateProvider>,
    );
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should catch internal service error', async () => {
    serviceRequest.mockReturnValue({});
    const { getByText } = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <ViewComments />
      </StateProvider>,
    );
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });
});
