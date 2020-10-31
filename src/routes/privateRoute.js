import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Header } from "../components/Header";
import { getItemFromLocalStorage } from "../helper/localStorage";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = getItemFromLocalStorage("code");

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
