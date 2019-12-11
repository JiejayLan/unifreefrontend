import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ViewReplies } from '../ViewReplies';

const firstReply = {
  content: 'testing content',
  createdAt: '2019-11-17T05:20:04.292Z',
  username: 'user',
};

const secondReply = {
  content: 'testing content',
  createdAt: '2019-11-18T05:20:04.292Z',
  username: 'user',
};

const replies = [];
replies.push(firstReply);
replies.push(secondReply);

describe('ViewReplies component test suits', () => {
  it('should not be rendered with empty replies array', () => {
    const { queryByTestId } = render(<ViewReplies replies={[]} />);
    expect(queryByTestId('replyList')).toBeNull();
  });

  it('should renders non-empty replies array', () => {
    const { getAllByTestId } = render(<ViewReplies replies={replies} />);
    expect(getAllByTestId('replyList').length).toEqual(2);
  });
});
