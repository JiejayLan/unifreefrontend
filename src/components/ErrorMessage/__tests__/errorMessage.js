import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ErrorMessage } from '../ErrorMessage';

describe('SignInForm test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<ErrorMessage message="invalid username" />);
    expect(getByText('invalid username')).toBeInTheDocument();
  });
});
