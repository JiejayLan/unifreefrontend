import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

test('redirects unauthenticated users', () => {
  const history = createMemoryHistory();
  const route = '/';
  history.push(route);
  render(
    <Router history={history} />,
  );
  expect(window.location.pathname).toBe('/');
});
