import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getItemFromLocalStorage } from "../helper/localStorage";

export const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = getItemFromLocalStorage("code");

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Redirect to="/home" />
          </div>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
