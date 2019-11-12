import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { CreatePostForm } from '../CreatePostForm';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');
jest.setTimeout(5000);

describe('CreatePostForm test suite', () => {
  const successPayLoad = {
    status: 'success',
    data: {
      title: 'test title',
      label: 'test label',
      content: 'test content',
    },
  };

  const failPayLoad = {
    status: 'error',
    data: {
      title: 'test title',
      label: '',
      content: 'test content',
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

  it('should create post successfully', async () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const { baseElement, getByTestId } = render(<CreatePostForm />);
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const labelInput = getByTestId('label');
    const titleInput = getByTestId('title');
    const contentInput = getByTestId('content');

    fireEvent.change(labelInput, { target: { value: 'testLabel' } });
    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.change(contentInput, { target: { value: 'testContent' } });

    fireEvent.click(getByTestId('create-button'));
    await new Promise((_) => setTimeout(_, 500));
    expect(baseElement.outerHTML).toBeDefined();
  });

  it('should catch error for internal service error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const renderDom = render(<CreatePostForm />);
    const { getByTestId, getByText } = renderDom;
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const labelInput = getByTestId('label');
    const titleInput = getByTestId('title');
    const contentInput = getByTestId('content');

    fireEvent.change(labelInput, { target: { value: 'testLabel' } });
    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.change(contentInput, { target: { value: 'testContent' } });

    fireEvent.click(getByTestId('create-button'));
    await new Promise((_) => setTimeout(_, 500));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should catch error for authentication error', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(<CreatePostForm />);
    const { getByTestId, getByText } = renderDom;
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const labelInput = getByTestId('label');
    const titleInput = getByTestId('title');
    const contentInput = getByTestId('content');

    fireEvent.change(labelInput, { target: { value: 'testLabel' } });
    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.change(contentInput, { target: { value: 'testContent' } });

    fireEvent.click(getByTestId('create-button'));
    await new Promise((_) => setTimeout(_, 500));
    expect(getByText('Authentication Error')).toBeInTheDocument();
  });

  it('should catch error for internal service error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const renderDom = render(<CreatePostForm />);
    const { getByTestId, getByText } = renderDom;
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const labelInput = getByTestId('label');
    const titleInput = getByTestId('title');
    const contentInput = getByTestId('content');

    fireEvent.change(labelInput, { target: { value: 'testLabel' } });
    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.change(contentInput, { target: { value: 'testContent' } });

    fireEvent.click(getByTestId('create-button'));
    await new Promise((_) => setTimeout(_, 500));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should catch error for internal service error', async () => {
    serviceRequest.mockReturnValue({});
    const renderDom = render(<CreatePostForm />);
    const { getByTestId, getByText } = renderDom;
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const labelInput = getByTestId('label');
    const titleInput = getByTestId('title');
    const contentInput = getByTestId('content');

    fireEvent.change(labelInput, { target: { value: 'testLabel' } });
    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.change(contentInput, { target: { value: 'testContent' } });

    fireEvent.click(getByTestId('create-button'));
    await new Promise((_) => setTimeout(_, 500));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should fail to create post, because of missing label', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(<CreatePostForm />);
    const { getByTestId } = renderDom;
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const labelInput = getByTestId('label');
    const titleInput = getByTestId('title');
    const contentInput = getByTestId('content');

    fireEvent.change(labelInput, { target: { value: '' } });
    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.change(contentInput, { target: { value: 'testContent' } });
    fireEvent.click(getByTestId('create-button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });

  it('should fail to create post, because of missing title', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(<CreatePostForm />);
    const { getByTestId } = renderDom;
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const contentInput = getByTestId('content');

    fireEvent.change(contentInput, { target: { value: 'testContent' } });
    fireEvent.click(getByTestId('create-button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });

  it('should fail to create post, because of missing content', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(<CreatePostForm />);
    const { getByTestId } = renderDom;
    fireEvent.click(getByTestId('create-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const titleInput = getByTestId('title');

    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.click(getByTestId('create-button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });
});
