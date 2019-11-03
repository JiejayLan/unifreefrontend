import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Button, Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import { bool } from 'prop-types';
import cookie from 'react-cookies';
import useStyles from './style';

export const NavBar = ({ isAuthenticated }) => {
  const classes = useStyles();
  const handleSignOut = () => {
    if (cookie.load('jwtToken')) {
      cookie.remove('jwtToken');
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <ForumRoundedIcon edge="start" aria-label="UniFree-forum" />
          <Typography variant="h6" className={classes.title}>
            UniFree
          </Typography>
          {isAuthenticated ? (
            <Button data-testid="logout-button" color="inherit" component={Link} to="/" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                className={classes.button}
                data-testid="login-button"
                color="inherit"
                component={Link}
                to="/signin"
              >
                  Login
              </Button>
              <Button data-testid="signup-button" variant="contained" component={Link} to="/">
                  Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.defaultProps = {
  isAuthenticated: false,
};

NavBar.propTypes = {
  isAuthenticated: bool,
};
