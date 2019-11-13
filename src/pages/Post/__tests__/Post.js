import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Post } from '../Post';

describe('Individual Post Page test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Post />);
    expect(getByText('sample title')).toBeInTheDocument();
  });
});