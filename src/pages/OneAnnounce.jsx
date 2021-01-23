import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiHandler from '../api/apiHandler';
import ApplyJob from '../components/ApplyJob';
import MapSearch from '../components/Map/MapSearch';
import FormMessage from '../components/Message/FormMessage';
import OtherServices from '../components/Profile/components/OtherServices';
import Services from '../components/Profile/components/Services';
import "../styles/Providers_Annc_Pages/One_Annc_Provider_Page.css"

class OneAnnounce extends Component {
      state = {
            announcement: null,
      }

      componentDidMount() {
            console.log(this.props.match.params.idAnnouncement)
            apiHandler.getOneAnnouncement(this.props.match.params.idAnnouncement)
                  .then(data => this.setState({ announcement: data }))
                  .catch(err => console.log(err))

      }

      render() {
            if (!this.state.announcement) {
                  return (<div><i className="fas fa-spinner"></i> Loading...</div>)
            }

            const { _id, author, service, additionalServices, title, description, location, applicants } = this.state.announcement;
            const { firstName, lastName, image } = author;
            console.log("check", location)
            return (
                  <div className="OnePackInformation one-announcement">
                        <div className="">
                              <div className="block flex-row header">
                                    <img src={image} alt={firstName} />
                                    <div>
                                          <h2>Hello, I am {firstName}</h2>
                                          <div className="btn-list flex-row">
                                                <FormMessage idAnnouncement={_id} idReceiver={author._id} title={title} />
                                                <br></br>
                                                <ApplyJob id={_id} applicants={applicants} />
                                          </div>

                                    </div>

                              </div>

                              <div className="block OnePackInformation__services">
                                    <h2>Requires: services</h2>
                                    <div className="flex-row-space-evenly">
                                          <Services
                                                defaultValue={service}
                                                editable="false"
                                          />
                                    </div>

                                    <h2>Other services</h2>
                                    <div >
                                          <OtherServices defaultValue={additionalServices} editable="false" />

                                    </div>
                              </div>

                              <div className="block">
                                    <h2><em>Title: </em> <strong>{title}</strong></h2>
                                    <p><em>Description: </em>{description}</p>
                              </div>

                        </div>




                        <div className="block">
                              <h2>Location</h2>
                              <MapSearch user={location} />
                        </div>


                  </div>


            )

      }
}

export default withRouter(OneAnnounce)