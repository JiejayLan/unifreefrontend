import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { ScrollToTop } from '../ScrollToTop';

describe('ElevationScroll Test Suit', () => {
  it('renders without crashing', () => {
    const renderDom = render(<ScrollToTop><p>Test</p></ScrollToTop>);
    const { getByText } = renderDom;
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Should scroll to top ', () => {
    const renderDom = render(
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12, 3, 4, 5, 6, 7, 8, 9, 0].map((element) => <p>{element}</p>)}
        <ScrollToTop scrollStep={200} delayInMS={16.6}>
          <button type="submit"><p>up</p></button>
        </ScrollToTop>
      </>,
    );
    const { container } = renderDom;
    const button = container.querySelector('button');
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    fireEvent.click(button);
    expect(window.pageYOffset).toBe(0);
  });
});
