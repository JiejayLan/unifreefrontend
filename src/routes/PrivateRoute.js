import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { func } from 'prop-types';
import cookie from 'react-cookies';
import { Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { NavBar } from '../components/NavBar';
import { ScrollToTop } from '../components/ScrollToTop';

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
        <ScrollToTop scrollStep={100} delayInMS={16.6}>
          <Fab color="inherit" size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollToTop>
      </>
    ) : (
      <Redirect to="/signin" />
    ))}
  />
);

PrivateRoute.propTypes = {
  component: func.isRequired,
};

export default PrivateRoute;
