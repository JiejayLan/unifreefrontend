import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MainPost } from '../MainPost';

describe('MainPost component test suite', () => {
  const mainPost = {
    label: 'sample',
    title: 'sample title',
    content: 'This is a sample content for the sample post with sample title',
    createdAt: '2019-11-07T09:26:51.822Z',
    username: 'sampleMe',
    postID: 1,
  };

  it('should render without crash', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <MainPost mainPost={mainPost} />
      </MemoryRouter>,
    );

    expect(getByTestId('continue-read-button')).toHaveTextContent('Continue Reading...');
  });
});
