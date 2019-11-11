import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { StateProvider } from '../../StateProvider';
import { Pagination } from '../Pagination';

const PaginationComp = () => {
  const initialState = {
    posts: [],
    page: { pageSize: 10, currentPage: 1, totalPages: 10 },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changePage':
        return {
          ...state,
          page: { ...state.page, ...action.newPage },
        };
      case 'changePosts':
        return {
          ...state,
          posts: action.newPosts,
        };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Pagination />
    </StateProvider>
  );
};


describe('Pagination component test suite', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  it('should render without crash', () => {
    const { baseElement } = render(
      <PaginationComp />,
    );

    expect(baseElement.outerHTML).toBeDefined();
  });
});
