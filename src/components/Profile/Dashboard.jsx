import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getAge } from '../../utils';
import UserContext from '../Auth/UserContext'
import AnnouncementList from '../Announcement/AnnouncementList';
import FavoriteOrBookingList from './components/FavoriteOrBookingList';
import apiHandler from '../../api/apiHandler';
import AddReview from '../../pages/AddReview';



export default class Dashboard extends Component {
      static contextType = UserContext;

      state = {
            user: null
      }
      componentDidMount() {
            apiHandler
                  .getProfile()
                  .then(data => {
                        this.context.setUser(data);
                        this.setState({ user: data })
                  })
                  .catch(error => {
                        console.log(error)
                        this.context.isLoading = false;
                  })
      }

      render() {
            console.log("user", this.state.user)
            if (this.state.user) {
                  const { image, firstName, lastName, birthday, formattedAddress, _id, favoriteProviders, bookingList } = this.state.user
                  const age = getAge(birthday)

                  // console.log("list",bookingList)
                  return (
                        <div className="dashboard__container">
                              <h1>Dashboard</h1>
                              <div>
                                    <div className="dashboard__information">
                                          <img src={image} className="image" alt="profile"/>
                                          <p><em>Name : </em>{firstName} <strong>{lastName}</strong></p>
                                          <p><em>Age: </em>{age}</p>
                                          <p><em>Address : </em>{formattedAddress}</p>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                          <h1>DO you want to find a care provider?</h1>
                                          <div className="block">
                                                <h2>Announcement list</h2>
                                                <NavLink to="/announcements/new">Add new</NavLink>
                                                <AnnouncementList idUser={_id} />
                                          </div>

                                          <div className="block">
                                                <h2>List of favorite providers</h2>
                                                <FavoriteOrBookingList list={favoriteProviders} isFavList="true" />
                                          </div>

                                          <br></br>
                                          <h1>Do you want to find a job?</h1>
                                          <div className="block">
                                                <h2>You received booking requests</h2>
                                                <FavoriteOrBookingList list={bookingList} isFavList="false" />
                                          </div>

                                          <br></br>
                                          <h1>Website</h1>
                                          <div className="block">
                                              <AddReview />
                                          </div>

                                          <a href="/message">Your Messages</a>


                                    </div>
                              </div>

                        </div>
                  )
            } else {
                  return <div>Loading ...</div>
            }


      }
}
