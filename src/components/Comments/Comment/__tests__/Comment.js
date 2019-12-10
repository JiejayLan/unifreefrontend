import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Comment } from '../Comment';

describe('Comment component test suits', () => {
  beforeAll(() => {
    // Silence console.error
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });
  it('should display correct replies content', async () => {
    const commentPayLoad = {
      commentID: 1,
      commenterID: 2,
      content: 'Nice job done',
      numReply: 0,
      createdAt: '2019-11-17T05:20:04.292Z',
      username: 'user',
      reply: [{ content: 'good test case', username: '323', createdAt: '2019-12-01T05:00:20.004Z' },
        { content: '123', username: '323', createdAt: '2019-12-01T05:00:20.004Z' }],
    };

    const { getByText, container } = render(
      <Comment
        comment={commentPayLoad}
      />,
    );
    fireEvent.click(container.querySelectorAll('button')[1]);
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('good test case')).toBeInTheDocument();
    expect(container.querySelectorAll('li.MuiListItem-root').length).toBe(3);
  });

  it('should display correct replies content', async () => {
    const commentPayLoad = {
      commentID: 1,
      commenterID: 2,
      content: 'Nice job done',
      numReply: 0,
      createdAt: '2019-11-17T05:20:04.292Z',
      username: 'user',
      reply: [],
    };

    const { container } = render(
      <Comment
        comment={commentPayLoad}
      />,
    );
    expect(container.querySelectorAll('button').length).toBe(1);
  });
});
