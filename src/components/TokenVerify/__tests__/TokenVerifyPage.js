import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { TokenVerifyPage } from '../TokenVerifyPage';

describe('TokenVerifyPage test', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<TokenVerifyPage />);
    expect(getByText('Token')).toBeInTheDocument();
  });
});
