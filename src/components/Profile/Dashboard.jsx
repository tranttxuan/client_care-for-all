import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getAge } from '../../utils';
import UserContext from '../Auth/UserContext'
import AnnouncementList from '../Announcement/AnnouncementList';

export default class Dashboard extends Component {
      static contextType = UserContext;

      state = {

      }


      render() {
            const { image, firstName, lastName, birthday, formattedAddress, _id } = this.context.user
            const age = getAge(birthday)

            return (
                  <div className="dashboard__container">
                        <h1>Dashboard</h1>
                        <div>
                              <div className="dashboard__information">
                                    <img src={image} className="image" />
                                    <p><em>Name : </em>{firstName} <strong>{lastName}</strong></p>
                                    <p><em>Age: </em>{age}</p>
                                    <p><em>Address : </em>{formattedAddress}</p>
                              </div>
<br></br>
<br></br>
                              <div style={{display:'flex', flexDirection:"column"}}>
                              <div className="block">
                                    <h2>List of announcement</h2> 
                                    <NavLink to="/announcements/new">Add new</NavLink>
                                    <AnnouncementList idUser={_id} />
                              </div>

                                    <a href="/message">Your Messages</a>
                                    <a href="/announcement">Your Announcement</a>
                                    <a href="/message">Create a new announcement</a>
                                    <a href="/message">List favorite Providers</a>
                                    <a href="/message">Yours Reviews</a>
                                    <a href="/message">Review Website</a>
                              </div>
                        </div>

                  </div>
            )
      }
}
