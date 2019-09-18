import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Route, BrowserRouter as Router,Switch } from 'react-router-dom'
import Users from './pages/UserPage'
import Notfound from "./pages/ErrorPage"
const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/users" component={Users} />
            <Route path="*" component={Notfound} />
        </Switch>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));
