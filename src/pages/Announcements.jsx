import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import ApplyJob from '../components/ApplyJob';
import UserContext from '../components/Auth/UserContext';
import Autocomplete from '../components/Map/AutoComplete';
import MapSearch from '../components/Map/MapSearch';
import FormMessage from '../components/Message/FormMessage';
import "../styles/Providers_Annc_Pages/Providers_Annc_Pages.css"

export default class Announcements extends Component {
      static contextType = UserContext;
      state = {
            list: [],
            searchCoordinates: []

      }
      componentDidMount() {
            const service = this.props.match.params.service;
            apiHandler.getAnnouncementsByService(service)
                  .then(data => this.setState({ list: data }))
                  .catch(err => console.log(err))
      }
      handleSelect = (place) => {
            this.setState({ searchCoordinates: place.geometry })
      }
      render() {
            return (
                  <div className="summary--public flex-column">
                        <div>
                              <div>
                                    <h2>Find jobs near by your location</h2>
                                    <Autocomplete onSelect={this.handleSelect} />
                              </div>
                              <div>
                                    <MapSearch
                                          list={this.state.list}
                                          search={this.state.searchCoordinates && this.state.searchCoordinates}

                                    />
                              </div>
                        </div>


                        <div className="summary--public__container ">
                              <h2>{this.state.list.length} Announcements</h2>
                              {this.state.list.map(({ _id, title, time, description, applicants, author }, i) => (
                                    <div key={i} className="block">
                                          <NavLink to={`/announcements/${_id}`} >
                                                <h3>{title}  <i className="fas fa-external-link-alt"></i></h3>
                                                <p>{description.substring(0, 100)}...</p>
                                                <p>Time:<strong>{time}</strong></p>
                                          </NavLink>
                                          <div className="flex-row btn-list">
                                                <ApplyJob id={_id} applicants={applicants} />

                                                <FormMessage idAnnouncement={_id} idReceiver={author} title={title} />

                                          </div>


                                    </div>

                              ))}
                        </div>

                  </div>
            )
      }
}
