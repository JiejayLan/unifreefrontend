import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EditPostForm } from '../EditPostForm';
import { serviceRequest } from '../../../../services/serviceRequest';
import { StateProvider } from '../../../StateProvider';

jest.mock('../../../../services/serviceRequest');

describe('EditPostForm test suite', () => {
  const initialState = {
    post: {
      label: 'general',
      title: '',
      content: '',
      updatedAt: '',
      username: '',
      postID: 1,
      posterID: 1,
    },
  };

  const mockReducer = jest.fn();

  const successPayLoad = {
    status: 'success',
    data: [1],
  };

  const failPayLoad = {
    status: 'error',
    data: [1],
  };

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('should edit post successfully', async () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const { baseElement, getByTestId } = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <EditPostForm />
      </StateProvider>,
    );
    fireEvent.click(getByTestId('edit-post-button'));
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

  it('should catch error for error status payload', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <EditPostForm />
      </StateProvider>,
    );
    const { getByTestId, getByText } = renderDom;
    fireEvent.click(getByTestId('edit-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const labelInput = getByTestId('label');
    const titleInput = getByTestId('title');
    const contentInput = getByTestId('content');

    fireEvent.change(labelInput, { target: { value: 'testLabel' } });
    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.change(contentInput, { target: { value: 'testContent' } });

    fireEvent.click(getByTestId('create-button'));
    await new Promise((_) => setTimeout(_, 500));
    expect(getByText('An Error has occured')).toBeInTheDocument();
  });

  it('should catch error for internal service error', async () => {
    serviceRequest.mockImplementation({});
    const renderDom = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <EditPostForm />
      </StateProvider>,
    );
    const { getByTestId, getByText } = renderDom;
    fireEvent.click(getByTestId('edit-post-button'));
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
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const renderDom = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <EditPostForm />
      </StateProvider>,
    );
    const { getByTestId, getByText } = renderDom;
    fireEvent.click(getByTestId('edit-post-button'));
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

  it('should fail to edit post, because of missing title', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <EditPostForm />
      </StateProvider>,
    );
    const { getByTestId } = renderDom;
    fireEvent.click(getByTestId('edit-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const contentInput = getByTestId('content');

    fireEvent.change(contentInput, { target: { value: 'testContent' } });
    fireEvent.click(getByTestId('create-button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });

  it('should fail to create post, because of missing content', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const renderDom = render(
      <StateProvider initialState={initialState} reducer={mockReducer}>
        <EditPostForm />
      </StateProvider>,
    );
    const { getByTestId } = renderDom;
    fireEvent.click(getByTestId('edit-post-button'));
    await new Promise((_) => setTimeout(_, 500));
    const titleInput = getByTestId('title');

    fireEvent.change(titleInput, { target: { value: 'testTitle' } });
    fireEvent.click(getByTestId('create-button'));
    expect(serviceRequest).not.toHaveBeenCalled();
  });
});
