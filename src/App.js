import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import NewAnnouncement from './components/Announcement/NewAnnouncement';
import ProtectRoute from './components/Auth/ProtectRoute';
import NavMain from './components/NavMain/NavMain';
import AddReview from './pages/AddReview';
import AllMessages from './pages/AllMessages';
import Announcements from './pages/Announcements';
import Home from './pages/Home';
import Login from './pages/Login';
import OneAnnounce from './pages/OneAnnounce';
import OneProvider from './pages/OneProvider';
import Profile from './pages/Profile';
import Providers from './pages/Providers';
import Signup from './pages/Signup';
import ChatThread from './pages/ChatThread';
import Footer from './components/Footer';


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
          <Route exact path="/announcements/:service/s" component={Announcements} />
          <Route exact path="/announcements/:idAnnouncement" component={OneAnnounce} />


          {/* Provider  */}
          <Route exact path="/providers/:service/s" component={Providers} />
          <Route exact path="/provider/:idProvider" component={OneProvider} />
          <ProtectRoute exact path="/provider/:idProvider/review" component={AddReview} />

          {/* Message  */}
          <ProtectRoute exact path="/message/:idMessage" component={ChatThread} />
          <ProtectRoute exact path="/message" component={AllMessages} />
        </Switch>

        <Footer />
      </div>
    )
  }
}
