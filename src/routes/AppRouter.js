import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Error from '../pages/error/Error';
import Home from '../pages/home/Home';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" component={Error} />
    </Switch>
  </Router>
);

export default AppRouter;
