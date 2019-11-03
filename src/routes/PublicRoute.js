import React from 'react';
import { Route } from 'react-router-dom';
import { func } from 'prop-types';
import { NavBar } from '../components/NavBar';

export const PublicRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
      <>
        <NavBar isAuthenticated={!!window.localStorage.jwtToken} />
        <Component {...props} />
      </>
    )}
  />
);

PublicRoute.propTypes = {
  component: func.isRequired,
};

export default PublicRoute;
