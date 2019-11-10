import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AllPost } from '../AllPost';
import { StateProvider } from '../../../StateProvider';
import { serviceRequest } from '../../../../services/serviceRequest';

jest.mock('../../../../services/serviceRequest');

const singlePost = {
  canEdit: true,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  createdAt: '2019-11-10T15:40:29.201Z',
  label: 'general',
  obsolete: false,
  postID: 183,
  posterID: 55,
  title: 'Lorem Ipsum',
  updatedAt: '2019-11-10T15:40:29.201Z',
  username: 'jielan3',
};
const posts = new Array(10).fill(singlePost);

describe('AllPost component test suite', () => {
  const initialState = {
    posts: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 1 },
  };

  const mockReducer = jest.fn();

  const successPayLoad = {
    status: 'success',
    headers: {
      Authorization: 'bearer token',
    },
    data: {
      currentPage: 1,
      totalPages: 10,
      posts,
    },
  };

  const failPayLoad = {
    status: 'error',
    headers: {
      Authorization: undefined,
    },
    data: null,
  };

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

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
