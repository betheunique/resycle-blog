import React from "react";
import { Router as ResycleRouter, Switch, Route } from "react-router-dom";

import Blog from "./Containers/Blog";
import Home from "./Containers/Home";
import BlogPost from "./Containers/BlogPost";

var createBrowserHistory = require("history").createBrowserHistory;
const history = createBrowserHistory();

const Router = () => {
  return (
    <ResycleRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/:title/:issueNumber" component={BlogPost} />
      </Switch>
    </ResycleRouter>
  );
};

export default Router;
