import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Error } from '../Error';

describe('Home Page test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Error />);
    expect(getByText('Not found')).toBeInTheDocument();
  });
});
