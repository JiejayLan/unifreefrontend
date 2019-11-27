import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { CommentInput } from '../CommentInput';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');
jest.setTimeout(5000);

describe('CommentBox Test Suite', () => {
  const successPayload = {
    status: 'success',
    data: {
      postID: 123,
      content: 'comment',
    },
  };

  beforeAll(() => {
    // Silence console.error
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('renders without crashing', () => {
    const { baseElement } = render(<CommentInput />);
    expect(baseElement.outerHTML).toBeDefined();
  });

  it('create comment successfully', async () => {
    serviceRequest.mockImplementation(async () => (successPayload));
    const renderDom = render(<CommentInput />);
    const { container } = renderDom;
    const commentInput = container.querySelector('textarea');
    fireEvent.change(commentInput, { target: { value: 'comment' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 10));
    expect(commentInput.value).toBe('');
  });

  it('should catch Internal Service Error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const renderDom = render(<CommentInput />);
    const { container, getByText } = renderDom;
    const commentInput = container.querySelector('textarea');
    fireEvent.change(commentInput, { target: { value: 'comment' } });
    fireEvent.click(container.querySelector('button'));
    await new Promise((_) => setTimeout(_, 10));
    expect(commentInput.value).toBe('comment');
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });
});
