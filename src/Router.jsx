import React from "react";
import { Switch, Route } from "react-router";
import {
  Book,
  History,
  Liked,
  Profile,
  Reset,
  Search,
  Signup,
  Signin,
  Test
} from "./pages";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Search} />
      <Route exact path={"/signup"} component={Signup} />
      <Route exact path={"/signin"} component={Signin} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/test"} component={Test} />

      <Auth>
        <Route exact path={"(/)?"} component={Search} />
        <Route exact path={"/user/book"} component={Book} />
        <Route exact path={"/user/history"} component={History} />
        <Route exact path={"/user/liked"} component={Liked} />
        <Route exact path={"/user/profile"} component={Profile} />
      </Auth>
    </Switch>
  );
};

export default Router;
