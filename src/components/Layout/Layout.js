import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'



// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Tables from "../../pages/tables";
import Locals from "../../pages/locals";

// context
import { useLayoutState } from "../../context/LayoutContext";
import UserUpdate from "../../pages/userUpdate/UserUpdate";
import UserAdd from "../../pages/userAdd/UserAdd";
import LocalAdd from "../../pages/localAdd/LocalAdd";
import LocalUpdate from "../../pages/localUpdate/LocalUpdate";
import Types from "../../pages/types/Types";
import AddTarif from "../../pages/addTarifs/AddTarifs";
import Reservations from "../../pages/reservations/reservations";
function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/Users" component={Tables} />
              <Route path="/app/local/:id/tarifs" component={AddTarif} />
              <Route path="/app/locals" component={Locals} />
              <Route path="/app/types" component={Types} />
              <Route path="/app/addLocal" component={LocalAdd} />
              <Route path="/app/updateUser/:id" component={UserUpdate} />
              <Route path="/app/addUser" component={UserAdd} />
              <Route path="/app/updateLocal/:id" component={LocalUpdate} />
              <Route path="/app/reservations" component={Reservations} />
             
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
             
              <div>
               
               
               
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
