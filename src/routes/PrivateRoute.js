import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { element } from 'prop-types';
import cookie from 'react-cookies';
import { NavBar } from '../components/NavBar';

export const PrivateRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (cookie.load('jwtToken') ? (
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
  component: element.isRequired,
};

export default PrivateRoute;
