import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { PostForm } from '../PostForm';

describe('PostForm test suite', () => {
  const handleCreate = jest.fn();
  const handleClose = jest.fn();
  const errorMsg = 'sample error';
  const post = {
    label: 'sample',
    title: 'sample title',
    content: 'sample content',
  };

  it('renders with post values', () => {
    const { getByTestId } = render(
      <PostForm
        handleCreate={handleCreate}
        handleClose={handleClose}
        errorMsg={errorMsg}
        editingPost
        post={post}
      />,
    );
    expect(getByTestId('label').value).toBe('sample');
    expect(getByTestId('title').value).toBe('sample title');
    expect(getByTestId('content').value).toBe('sample content');
  });
});
