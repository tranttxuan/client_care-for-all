import React, { Component } from 'react'
import Dashboard from '../components/Profile/Dashboard';
import EditProfile from '../components/Profile/EditProfile';
import "../styles/Profile.css"


export default class Profile extends Component {
      render() {
            return (
                  <div className="profile-page">
                              <div className="profile_radio margin-bottom">
                                    <input type="radio" id="dashboard" value="Dashboard" name="profile" defaultChecked/>
                                    <label htmlFor="dashboard" className="btn btn-action-1 margin-bottom">Dashboard</label>
                                    <Dashboard />
                              </div>



                              <div className="profile_radio margin-bottom">
                                    <input type="radio" id="edit" value="Edit Profile" name="profile" />
                                    <label htmlFor="edit"  className="btn btn-action-1 margin-bottom">Edit your profile</label>
                                    <EditProfile />
                              </div>


                  </div>
            )
      }
}
