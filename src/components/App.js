import React from "react";
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

// components
import Layout from "./Layout";

// pages

import Login from "../pages/login";
import Home from "../pages/home/Home";
// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/users" />} />
        
        <Route  path="/home"  component={Home} ></Route>
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
