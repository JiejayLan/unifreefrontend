import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../Home';
import { serviceRequest } from '../../../services/serviceRequest';

jest.mock('../../../services/serviceRequest');

describe('Home Page test', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('renders without crashing', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(expect(baseElement.outerHTML).toBeDefined());
  });
});
