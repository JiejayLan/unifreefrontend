import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Error } from '../pages/error';
import { Home } from '../pages/home';
import { SignIn } from '../pages/signIn';

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="*" component={Error} />
    </Switch>
  </Router>
);
