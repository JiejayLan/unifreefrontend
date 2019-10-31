import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Error } from '../pages/error';
import { Home } from '../pages/home';
import { Message } from '../components/Message';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => (
  <Router>
    <Switch>
      <PublicRoute exact path="/" component={Home} />
      <PrivateRoute path="/message" component={Message} />
      <PublicRoute path="*" component={Error} />
    </Switch>
  </Router>
);
