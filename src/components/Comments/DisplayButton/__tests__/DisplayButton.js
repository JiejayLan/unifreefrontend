import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { DisplayButton } from '../DisplayButton';

const changeReplyStatus = jest.fn();

describe('DisplayRepliesButton component test suits', () => {
  it('should display replies number', () => {
    const { getByText, container } = render(
      <DisplayButton
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
      <DisplayButton
        replyNum={10}
        replyStatus
        changeReplyStatus={changeReplyStatus}
      />,
    );
    expect(getByText('HIDE REPLY')).toBeInTheDocument();
  });
});
