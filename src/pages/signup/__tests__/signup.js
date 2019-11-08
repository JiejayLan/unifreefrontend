import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { SignUp } from '../singup';

describe('SignInForm test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<SignUp />);
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Username')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });
});
