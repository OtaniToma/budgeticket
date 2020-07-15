import React from "react";
import { Switch, Route } from "react-router";
import {
  Cart,
  History,
  Like,
  Profile,
  Reset,
  Search,
  Signup,
  Signin,
} from "./pages";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Search} />
      <Route exact path={"/signup"} component={Signup} />
      <Route exact path={"/signin"} component={Signin} />
      <Route exact path={"/signin/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={Search} />
        <Route exact path={"/user/cart"} component={Cart} />
        <Route exact path={"/user/history"} component={History} />
        <Route exact path={"/user/like"} component={Like} />
        <Route exact path={"/user/profile"} component={Profile} />
      </Auth>
    </Switch>
  );
};

export default Router;
