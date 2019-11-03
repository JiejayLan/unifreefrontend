import { render } from '@testing-library/react';
import React from 'react';
import { AppRouter } from '../AppRouter';
import '@testing-library/jest-dom/extend-expect';

// Don't know how to test react router
describe('app touter test suite', () => {
  test('renders without crashing', () => {
    const { getByText } = render(<AppRouter />);
    expect(getByText('This is home page')).toBeInTheDocument();
  });
});
