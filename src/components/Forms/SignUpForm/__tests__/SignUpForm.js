import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignUpForm } from '../SignUpForm';

describe('SignUpForm Test Suite', () => {
  it('Should render without crashing', () => {
    const { getByText } = render(<SignUpForm />);
    expect(getByText('Sign Up')).toBeInTheDocument();
  });
});
