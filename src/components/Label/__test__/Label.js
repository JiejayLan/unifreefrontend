import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Label } from '../Label';

describe('SignInForm test suite', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Label label="University" />);
    expect(getByText('University')).toBeInTheDocument();
  });

  it('renders but does not appear', () => {
    const { getByText } = render(<Label label="" />);
    expect(getByText('')).toBeInTheDocument();
  });
});
