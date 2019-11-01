import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { TokenVerification } from '../TokenVerification';

describe('SignInForm test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<TokenVerification />);
    expect(getByText('Please enter token to verify your email!')).toBeInTheDocument();
    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('Token')).toBeInTheDocument();
    expect(getByText('Verify token')).toBeInTheDocument();
  });
});
