import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ElevationScroll } from '../ElevationScroll';

describe('ElevationScroll Test Suit', () => {
  it('renders without crashing', () => {
    const renderDom = render(<ElevationScroll><p>Test</p></ElevationScroll>);
    const { getByText } = renderDom;
    expect(getByText('Test')).toBeInTheDocument();
  });
});
