import React from 'react';
import { Route } from 'react-router-dom';
import { func } from 'prop-types';
import cookie from 'react-cookies';
import { Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { NavBar } from '../components/NavBar';
import { ScrollToTop } from '../components/ScrollToTop';

export const PublicRoute = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
      <>
        <NavBar isAuthenticated={!!cookie.load('jwtToken')} />
        <Component {...props} />
        <ScrollToTop scrollStep={200} delayInMS={16.6}>
          <Fab color="inherit" size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollToTop>
      </>
    )}
  />
);

PublicRoute.propTypes = {
  component: func.isRequired,
};

export default PublicRoute;
