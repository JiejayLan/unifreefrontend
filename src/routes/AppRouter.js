import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </Router>
);

export default AppRouter;
