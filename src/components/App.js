import React from "react";
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

// components
import Layout from "./Layout";
import AlertTemplate from "react-alert-template-snackbar-material-ui";
// pages
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import Login from "../pages/login";
import LoginClt from "../pages/loginClt/LoginClt";
import Home from "../pages/home/Home";
import UserSpace from "../pages/userSpace/userSpace";
// context
import { useUserState } from "../context/UserContext";
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.FADE
};
export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <BrowserRouter>
      <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
        <PrivateRoute  path="/home"  component={Home} />
        <PrivateRoute path="/app" component={Layout} />
        <PrivateRoute path="/userSpace" component={UserSpace} />
        <PublicRoute path="/loginAdmin" component={Login} />
        <PublicRoute path="/login" component={LoginClt} />

        
      </Switch>
    </BrowserRouter>
    </AlertProvider>
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
