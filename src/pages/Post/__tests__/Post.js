import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Post } from '../Post';

describe('Post Page test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Post />);
    expect(getByText('general')).toBeInTheDocument();
  });
});
