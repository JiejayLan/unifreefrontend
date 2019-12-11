import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ReplyForm } from '../ReplyForm';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');
jest.setTimeout(5000);

describe('ReplyForm test suite', () => {
  const successPayload = {
    status: 'success',
    data: {
      commentID: 123,
      content: 'Reply',
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
    const { baseElement } = render(<ReplyForm />);
    expect(baseElement.outerHTML).toBeDefined();
  });

  it('it should render input box after button click', async () => {
    serviceRequest.mockImplementation(async () => (successPayload));
    const renderDom = render(<ReplyForm />);
    const { container, queryByTestId } = renderDom;
    fireEvent.click(queryByTestId('showReplyButton'));
    expect(container.querySelector('textarea').toBeDefined);
    expect(queryByTestId('replyButton').toBeDefined);
    expect(queryByTestId('cancelButton').toBeDefined);
  });

  it('it should create reply successfully', async () => {
    serviceRequest.mockImplementation(async () => (successPayload));
    const renderDom = render(<ReplyForm />);
    const { container, queryByTestId } = renderDom;
    fireEvent.click(queryByTestId('showReplyButton'));
    const replyInput = container.querySelector('textarea');
    fireEvent.change(replyInput, { target: { value: 'reply' } });
    fireEvent.click(queryByTestId('replyButton'));
    await new Promise((_) => setTimeout(_, 100));
    expect(replyInput.value).toBe('');
    expect(container.querySelector('textarea').toBeNull);
    expect(queryByTestId('replyButton').toBeNull);
    expect(queryByTestId('cancelButton').toBeNull);
  });

  it('should catch Internal Service Error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const renderDom = render(<ReplyForm />);
    const { container, getByText, queryByTestId } = renderDom;
    fireEvent.click(queryByTestId('showReplyButton'));
    const replyInput = container.querySelector('textarea');
    fireEvent.change(replyInput, { target: { value: 'reply' } });
    fireEvent.click(queryByTestId('replyButton'));
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });
});
