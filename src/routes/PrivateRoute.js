import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bool, element } from 'prop-types';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (isAuthenticated ? (
      <>
        <Component {...props} />
      </>
    ) : (
      <Redirect to="/" />
    ))}
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: bool.isRequired,
  component: element.isRequired,
};

export default PrivateRoute;
