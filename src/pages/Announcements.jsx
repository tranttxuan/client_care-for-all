import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import ApplyJob from '../components/ApplyJob';
import UserContext from '../components/Auth/UserContext';
import Autocomplete from '../components/Map/AutoComplete';
import MapSearch from '../components/Map/MapSearch';


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
                  <div>
                          <div>
                              <h3>Find jobs near by your location</h3>
                              <Autocomplete onSelect={this.handleSelect} />
                        </div>
                        <div>
                              <MapSearch
                                    list={this.state.list}
                                    search={this.state.searchCoordinates && this.state.searchCoordinates} 

                                    />
                        </div>
                        
                        <div>
                              {this.state.list.map(({ _id, title, time, description, applicants }, i) => (
                                    <div key={i} className="block">
                                          <NavLink to={`/announcements/${_id}`} >
                                                <h3>{title}</h3>
                                                <p>{description.substring(0, 100)}...</p>
                                                <p>Time:<strong>{time}</strong></p>
                                          </NavLink>
                                          <div>
                                                <ApplyJob id={_id} applicants={applicants} />
                                                <button>Contact</button>
                                          </div>


                                    </div>

                              ))}
                        </div>

                  </div>
            )
      }
}
