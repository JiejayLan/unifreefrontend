import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ViewReplies } from '../ViewReplies';

const singleReply = {
  content: 'testing content',
  createdAt: '2019-11-17T05:20:04.292Z',
  username: 'user',
};
const replies = new Array(10).fill(singleReply);

describe('ViewReplies component test suits', () => {
  it('should not be rendered with empty replies array', () => {
    const { queryByTestId } = render(<ViewReplies replies={[]} commentID={233} />);
    expect(queryByTestId('replyList')).toBeNull();
  });

  it('should renders with crash with empty replies array', () => {
    const { getAllByTestId } = render(<ViewReplies replies={replies} commentID={233} />);
    expect(getAllByTestId('replyList').length).toEqual(10);
  });
});
