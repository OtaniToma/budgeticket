import React from 'react';
import {Switch, Route} from 'react-router';
import {
  Booked,
  Confirm,
  Home,
  Liked,
  Reset,
  Search,
  Signup,
  Signin,
} from './pages';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'(/)?'} component={Home} />
      <Route exact path={'(/search)?'} component={Search} />
      <Route exact path={'/signup'} component={Signup} />
      <Route exact path={'/signin'} component={Signin} />
      <Route exact path={'/reset'} component={Reset} />
      <Auth>
        <Route exact path={'(/)?'} component={Home} />
        <Route exact path={'(/search)?'} component={Search} />
        <Route exact path={'/user/confirm'} component={Confirm} />
        <Route exact path={'/user/booked'} component={Booked} />
        <Route exact path={'/user/liked'} component={Liked} />
      </Auth>
    </Switch>
  );
};

export default Router;
