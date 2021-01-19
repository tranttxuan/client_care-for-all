import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import ApplyJob from '../components/ApplyJob';
import UserContext from '../components/Auth/UserContext';
import MapSearch from '../components/Map/MapSearch';


export default class Announcements extends Component {
      static contextType = UserContext;
      state = {
            list: [],

      }
      componentDidMount() {
            const service = this.props.match.params.service;
            apiHandler.getAnnouncementsByService(service)
                  .then(data => this.setState({ list: data }))
                  .catch(err => console.log(err))
      }
      render() {
            return (
                  <div>
                        <div>Search bar</div>
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

                        <div>
                              <MapSearch list={this.state.list}/>
                        </div>
                  </div>
            )
      }
}
