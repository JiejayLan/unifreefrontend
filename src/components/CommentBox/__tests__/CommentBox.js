import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { CommentBox } from '../CommentBox';

describe('CommentBox Test Suite', () => {
  beforeAll(() => {
    // Silence console.error
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  it('renders without crashing', () => {
    const { baseElement } = render(<CommentBox />);
    expect(baseElement.outerHTML).toBeDefined();
  });
});
