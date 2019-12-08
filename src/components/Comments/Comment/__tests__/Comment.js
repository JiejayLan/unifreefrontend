import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { DisplayRepliesButton, Comment } from '../Comment';

const changeReplyStatus = jest.fn();

describe('DisplayRepliesButton component test suits', () => {
  it('should display replies number', () => {
    const { getByText, container } = render(
      <DisplayRepliesButton
        replyNum={10}
        replyStatus={false}
        changeReplyStatus={changeReplyStatus}
      />,
    );
    expect(getByText('10 replies')).toBeInTheDocument();
    fireEvent.click(container.querySelector('button'));
    expect(changeReplyStatus).toBeCalled();
  });

  it('should hide replies', () => {
    const { getByText } = render(
      <DisplayRepliesButton
        replyNum={10}
        replyStatus
        changeReplyStatus={changeReplyStatus}
      />,
    );
    expect(getByText('HIDE REPLY')).toBeInTheDocument();
  });
});


describe('Comment component test suits', () => {
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
    fireEvent.click(container.querySelector('button'));
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
    expect(container.querySelectorAll('button').length).toBe(0);
  });
});
