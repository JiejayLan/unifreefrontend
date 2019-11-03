import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { func } from 'prop-types';
import { NavBar } from '../components/NavBar';

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (window.localStorage.jwtToken ? (
      <>
        <NavBar isAuthenticated />
        <Component {...props} />
      </>
    ) : (
      <Redirect to="/" />
    ))}
  />
);

PrivateRoute.propTypes = {
  component: func.isRequired,
};

export default PrivateRoute;
