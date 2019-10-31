import React from 'react';
import { Route } from 'react-router-dom';
import { element } from 'prop-types';

export const PublicRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
      window.localStorage.jwtToken ? (
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
  component: element.isRequired,
};

export default PublicRoute;
