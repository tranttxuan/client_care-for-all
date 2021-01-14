import React, { Component } from 'react'
import Dashboard from '../components/Profile/Dashboard';
import EditProfile from '../components/Profile/EditProfile';
import "../styles/Profile.css"


export default class Profile extends Component {
      render() {
            return (
                  <div>
                        <div>

                              <div className="profile_radio">
                                    <label htmlFor="dashboard">Dashboard</label>
                                    <input type="radio" id="dashboard" value="Dashboard" name="profile" defaultChecked/>
                                    <Dashboard />
                              </div>



                              <div className="profile_radio">
                                    <label htmlFor="edit">Edit your profile</label>
                                    <input type="radio" id="edit" value="Edit Profile" name="profile" />
                                    <EditProfile />
                              </div>


                        </div>

                  </div>
            )
      }
}
