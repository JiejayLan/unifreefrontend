import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Error } from '../pages/error';
import { Home } from '../pages/home';
import { TokenVerify } from '../pages/tokenVerify';
import { PublicRoute } from './PublicRoute';
import { SignIn } from '../pages/signIn';
import { SignUp } from '../pages/signup';

export const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <PublicRoute path="/tokenVerify" component={TokenVerify} />
      <PublicRoute path="/signin" component={SignIn} />
      <PublicRoute path="*" component={Error} />
      <PublicRoute path="/signup" component={SignUp} />
    </Switch>
  </Router>
);
