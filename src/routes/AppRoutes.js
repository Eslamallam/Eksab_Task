import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Login } from "../components/Login";
import { GitHubRepos } from "../components/GitHubRepos";
import { PrivateRoute } from "./privateRoute";
import { PublicRoute } from "./publicRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute path="/" component={Login} exact={true} />
          <PrivateRoute path="/home" component={GitHubRepos} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
