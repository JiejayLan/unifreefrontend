import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Home } from '../Home';

describe('Home Page test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Home />);
    expect(getByText('This is home page')).toBeInTheDocument();
  });
});
