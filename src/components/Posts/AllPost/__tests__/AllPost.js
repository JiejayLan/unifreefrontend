import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AllPost } from '../AllPost';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');

describe('AllPost component test suite', () => {
  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('should render without crash', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <AllPost />
      </MemoryRouter>,
    );

    expect(baseElement.outerHTML).toBeDefined();
  });
});
