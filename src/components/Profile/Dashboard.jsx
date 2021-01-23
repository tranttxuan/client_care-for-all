import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { getAge } from '../../utils';
import UserContext from '../Auth/UserContext'
import AnnouncementList from '../Announcement/AnnouncementList';
import FavoriteOrBookingList from './components/FavoriteOrBookingList';
import apiHandler from '../../api/apiHandler';
import AddReview from '../../pages/AddReview';
import MessageTable from '../Message/MessageTable';



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
            if (this.state.user) {
                  const { image, firstName, lastName, birthday, formattedAddress, _id, favoriteProviders, bookingList } = this.state.user
                  const age = getAge(birthday)

                  // console.log("list",bookingList)
                  return (
                        <div className="flex-column">
                              <h1 className="margin-bottom">Dashboard</h1>
                              <div>
                                    <div className="block margin-bottom">
                                          <img src={image} className="image" alt="profile" />
                                          <p><em>Name : </em>{firstName} <strong>{lastName}</strong></p>
                                          {!isNaN(age) && <p><em>Age: </em> {age}</p>}
                                          <p><em>Address : </em>{formattedAddress}</p>
                                    </div>

                                    <div className=" margin-bottom">
                                          <h1 className="margin-bottom">Do you want to find a care provider?</h1>

                                          <div className="block margin-bottom">
                                                <h2 className="margin-bottom">Announcement list</h2>
                                                <NavLink to="/announcements/new" className="btn btn-action">Add new</NavLink>
                                                <AnnouncementList idUser={_id} />
                                          </div>

                                          <div className="block">
                                                <h2>List of favorite providers</h2>
                                                <FavoriteOrBookingList list={favoriteProviders} isFavList="true" />
                                          </div>

                                    </div>
                                    <div className="margin-bottom">
                                          <h1 className="margin-bottom">Do you want to find a job?</h1>

                                          <div className="block">
                                                <h2>You received booking requests</h2>
                                                <FavoriteOrBookingList list={bookingList} isFavList="false" />
                                          </div>

                                    </div>

                                    <div className="margin-bottom">
                                          <h1 className="margin-bottom">Review for our website</h1>
                                          <div className="block">
                                                <AddReview />
                                          </div>
                                    </div>

                                    <div>
                                          <h1 className="margin-bottom">Message</h1>
                                          <MessageTable />
                                    </div>
                              </div>

                        </div>
                  )
            } else {
                  return <div>Loading ...</div>
            }


      }
}
