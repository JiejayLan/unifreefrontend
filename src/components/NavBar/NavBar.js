import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Button, Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import { bool } from 'prop-types';
import cookie from 'react-cookies';
import { CreatePostForm } from '../Forms/CreatePostForm';
import { ElevationScroll } from '../ElevationScroll';
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
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar>
            <ForumRoundedIcon edge="start" aria-label="UniFree-forum" />
            <Typography variant="h6" color="inherit" className={classes.title} component={Link} to="/">
              UniFree
            </Typography>
            {isAuthenticated ? (
              <>
                <CreatePostForm />
                <Button
                  className={classes.buttonRight}
                  data-testid="logout-button"
                  color="inherit"
                  component={Link}
                  to="/"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </>
            ) : (
                <>
                  <Button
                    className={classes.buttonLeft}
                    data-testid="login-button"
                    color="inherit"
                    component={Link}
                    to="/signin"
                  >
                    Login
                </Button>
                  <Button data-testid="signup-button" variant="contained" component={Link} to="/signup">
                    Signup
                </Button>
                </>
              )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
};

NavBar.defaultProps = {
  isAuthenticated: false,
};

NavBar.propTypes = {
  isAuthenticated: bool,
};
