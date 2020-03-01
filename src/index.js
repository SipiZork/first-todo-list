import React from "react";
import ReactDOM from "react-dom";
import './css/index.css';
import App from './components/App';
import NotFound from './components/NotFound';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


const Root = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={App} />
        <Route exact path="/register" component={App} />
        <Route exact path="/:userId/" component={App} />
        <Route exact path="/:userId/:todoId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

var destination = document.querySelector('.fluid-container');

ReactDOM.render(<Root />, destination);
