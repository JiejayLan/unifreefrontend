import React from 'react';
import { Route } from 'react-router-dom';
import { bool, element } from 'prop-types';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
      isAuthenticated ? (
        <>
          <Component {...props} />
        </>
      ) : (
        <>
          <Component {...props} />
        </>
      )
    )}
  />
);

PublicRoute.propTypes = {
  isAuthenticated: bool.isRequired,
  component: element.isRequired,
};

export default PublicRoute;
