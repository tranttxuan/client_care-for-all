import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import ProtectRoute from './components/Auth/ProtectRoute';
import NavMain from './components/NavMain/NavMain';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


export default class App extends Component {
  state = {

  }
  render() {
    return (
      <div>
      <NavMain />

        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectRoute exact path="/profile" component={Profile} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />

        </Switch>


      </div>
    )
  }
}
