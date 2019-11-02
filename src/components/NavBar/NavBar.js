import './NavBar.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Button, Typography,
} from '@material-ui/core';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import { bool } from 'prop-types';

export const NavBar = ({ isAuthenticated }) => {
  const handleSignOut = () => {
    if (window.localStorage.jwtToken) {
      window.localStorage.clear();
    }
  };

  return (
    <AppBar position="static" className="nav-bar">
      <Toolbar>
        <ForumRoundedIcon edge="start" aria-label="UniFree-forum" />
        <Typography variant="h6" className="title">
          UniFree
        </Typography>
        {isAuthenticated ? (
          <Button data-testid="logout-button" color="inherit" component={Link} to="/" onClick={handleSignOut}>
            Logout
          </Button>
        ) : (
          <>
            <Button data-testid="login-button" color="inherit" component={Link} to="/signin">
                Login
            </Button>
            <Button data-testid="signup-button" variant="contained" component={Link} to="/">
                Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

NavBar.defaultProps = {
  isAuthenticated: false,
};

NavBar.propTypes = {
  isAuthenticated: bool,
};
