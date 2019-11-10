import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SubPost } from '../SubPost';

describe('SubPost component test suite', () => {
  const post = {
    label: 'sample',
    title: 'sample title',
    content: 'This is a sample content for the sample post with sample title',
    updatedAt: '2019-11-07T09:26:51.822Z',
    username: 'sampleMe',
    postID: 1,
  };

  it('should render without crash', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <SubPost post={post} />
      </MemoryRouter>,
    );

    expect(baseElement.outerHTML).toBeDefined();
  });
});
