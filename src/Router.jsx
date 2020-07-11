import React from 'react'
import { Switch, Route } from 'react-router'
import { Home, Login } from './templates'

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Home} />
      <Route exact path={"/login"} component={Login} />
    </Switch>
  )
}

export default Router