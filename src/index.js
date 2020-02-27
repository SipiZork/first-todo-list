import React from "react";
import ReactDOM from "react-dom";
import './css/index.css';
import App from './components/App';
import NotFound from './components/NotFound';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


const Root = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={NotFound} />
        <Route exact path="/:userId/:todoListId" component={App} />
        <Route exact path="/:userId/:todoListId/:todoId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

var destination = document.querySelector('.fluid-container');

ReactDOM.render(<Root />, destination);
