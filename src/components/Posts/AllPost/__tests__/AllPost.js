import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AllPost } from '../AllPost';
import { StateProvider } from '../../../StateProvider';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');

describe('AllPost component test suite', () => {
  const initialState = {
    posts: [],
    page: { pageSize: 25, currentPage: 1, totalPages: 1 },
  };

  const mockReducer = jest.fn();

  const successPayLoad = {
    status: 'success',
    headers: {
      Authorization: 'bearer token',
    },
    params: {
      page: 1,
      pageSize: 2,
      viewall: true,
    },
  };

  const failPayLoad = {
    status: 'error',
    headers: {
      Authorization: undefined,
    },
    params: {
      page: 1,
      pageSize: 2,
      viewall: true,
    },
  };


  beforeEach(() => {
    serviceRequest.mockClear();
  });

  it('should render without crash', () => {
    serviceRequest.mockImplementation(async () => (successPayLoad));
    const { baseElement } = render(
      <MemoryRouter>
        <StateProvider initialState={initialState} reducer={mockReducer}>
          <AllPost />
        </StateProvider>
      </MemoryRouter>,
    );

    expect(baseElement.outerHTML).toBeDefined();
  });

  it('should catch authorization error', async () => {
    serviceRequest.mockReturnValue(failPayLoad);
    const { getByText } = render(
      <MemoryRouter>
        <StateProvider initialState={initialState} reducer={mockReducer}>
          <AllPost />
        </StateProvider>
      </MemoryRouter>,
    );
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Authorization Error')).toBeInTheDocument();
  });

  it('should catch internal service error', async () => {
    serviceRequest.mockImplementation(async () => { throw new Error('Internal Service Error'); });
    const { getByText } = render(
      <MemoryRouter>
        <StateProvider initialState={initialState} reducer={mockReducer}>
          <AllPost />
        </StateProvider>
      </MemoryRouter>,
    );
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });

  it('should catch internal service error', async () => {
    serviceRequest.mockReturnValue({});
    const { getByText } = render(
      <MemoryRouter>
        <StateProvider initialState={initialState} reducer={mockReducer}>
          <AllPost />
        </StateProvider>
      </MemoryRouter>,
    );
    await new Promise((_) => setTimeout(_, 100));
    expect(getByText('Internal Service Error')).toBeInTheDocument();
  });
});
