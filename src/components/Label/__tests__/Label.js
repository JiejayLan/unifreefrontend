import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { Label } from '../Label';

describe('Label test suite', () => {
  it('renders the label', () => {
    const { getByText } = render(<Label label="University" />);
    expect(getByText('University')).toBeInTheDocument();
  });

  it('does not render the label', () => {
    const { container } = render(<Label label="" />);
    expect(container).toBeDefined();
    expect(container.innerHTML).toBe('<span></span>');
  });
});
