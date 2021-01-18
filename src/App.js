import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import EditAnnouncement from './components/Announcement/EditAnnouncement';
import NewAnnouncement from './components/Announcement/NewAnnouncement';
import ProtectRoute from './components/Auth/ProtectRoute';
import NavMain from './components/NavMain/NavMain';
import AddReview from './pages/AddReview';
import Home from './pages/Home';
import Login from './pages/Login';
import OneAnnounce from './pages/OneAnnounce';
import OneProvider from './pages/OneProvider';
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
          {/* AUTH  */}
          <Route exact path="/" component={Home} />
          <ProtectRoute exact path="/profile" component={Profile} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />

          {/* Announcement  */}
          <ProtectRoute exact path="/announcements/new" component={NewAnnouncement} />
          <ProtectRoute exact path="/announcements/edit/:idPost" component={NewAnnouncement} />
          <Route exact path="/announcements/:idAnnouncement" component={OneAnnounce} />


          {/* Provider  */}
          <Route exact path="/provider/:idProvider" component={OneProvider} />
          <ProtectRoute exact path="/provider/:idProvider/review" component={AddReview} />
        </Switch>


      </div>
    )
  }
}
