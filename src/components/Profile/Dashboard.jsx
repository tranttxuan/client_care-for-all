import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getAge } from '../../utils';
import UserContext from '../Auth/UserContext'

export default class Dashboard extends Component {
      static contextType = UserContext;

      state = {

      }
      

      render() {
            const { image, firstName, lastName, birthday, formattedAddress } = this.context.user
            console.log(this.context.user)
            const age = getAge(birthday)

            return (
                  <div className="dashboard__container">
                        <div className="dashboard__information">
                              <img src={image} className="image" />
                              <p><em>Name : </em>{firstName} <strong>{lastName}</strong></p>
                              <p><em>Age: </em>{age}</p>
                              <p><em>Address : </em>{formattedAddress}</p>
                        </div>

                        <div>
                     
                              <a href="/message">Your Messages</a>
                              <a href="/announcement">Your Announcement</a>
                              <a>Create a new announcement</a>
                              <a>List favorite Providers</a>
                              <a>Yours Reviews</a>
                              <a>Review Website</a>
                        </div>
                  </div>
            )
      }
}
