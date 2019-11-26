import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Post } from '../Post';
import { serviceRequest } from '../../../services/serviceRequest';

jest.mock('../../../services/serviceRequest');

describe('Post Page test', () => {
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
      comments: {
        commentID: 1,
        commenterID: 1,
        content: 'testing content',
        numReply: 0,
        createdAt: '2019-11-17T05:20:04.292Z',
        username: 'user',
      },
      currentPage: 1,
      totalPages: 10,
    },
  };

  it('renders without crashing', () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const { getByText } = render(
      <Post />,
    );
    expect(getByText('general')).toBeInTheDocument();
  });
});
