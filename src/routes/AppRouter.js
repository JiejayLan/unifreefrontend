import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Error } from '../pages/error';
import { Home } from '../pages/home';
import { TokenVerification } from '../pages/tokenVerify';

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/verifyToken" component={TokenVerification} />
      <Route path="*" component={Error} />
    </Switch>
  </Router>
);
