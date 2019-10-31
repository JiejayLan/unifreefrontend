import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { SignIn } from '../SignIn';

describe('SignInForm test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText('Sign In')).toBeInTheDocument();
  });
});
