import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Error } from '../pages/error';
import { Home } from '../pages/home';
import { TokenVerify } from '../pages/tokenVerify';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { SignIn } from '../pages/signIn';
import { Post } from '../pages/Post';

export const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <PublicRoute path="/tokenVerify" component={TokenVerify} />
      <PublicRoute path="/signin" component={SignIn} />
      <PrivateRoute path="/viewpost" component={Post} />
      <PublicRoute path="*" component={Error} />
    </Switch>
  </Router>
);
