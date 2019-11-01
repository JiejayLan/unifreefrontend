import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from '../NavBar';

describe('Navbar component test suite', () => {
  it('should render guest view successfully', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavBar isAuthenticated={false} />
      </MemoryRouter>,
    );

    expect(getByTestId('login-button')).toHaveTextContent('Login');
    expect(getByTestId('signup-button')).toHaveTextContent('Signup');
  });

  it('should render signin user view successfully', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavBar isAuthenticated />
      </MemoryRouter>,
    );

    expect(getByTestId('logout-button')).toHaveTextContent('Logout');
  });
});
