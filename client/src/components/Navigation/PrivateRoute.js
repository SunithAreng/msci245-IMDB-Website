import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Reviews from '../Reviews';
import MyPage from '../MyPage';
import Landing from '../Landing';
import history from './history';
import Search from '../Search';

export default function PrivateRoute({

}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/myPage" exact component={MyPage} />
      <Route path="/search" exact component={Search} />
      <Route path="/" exact component={Landing} />
      </Switch>
    </Router>
  );
}