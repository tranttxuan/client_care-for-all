import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';
import ButtonAddFavoriteList from '../components/ButtonAddFavoriteList';
import MapSearch from '../components/Map/MapSearch';

export default class Providers extends Component {
      static contextType = UserContext;
      state = {
            list: [],

      }
      componentDidMount() {
            const service = this.props.match.params.service;
            apiHandler.getProvidersByService(service)
                  .then(data => this.setState({ list: data }))
                  .catch(err => console.log(err))
      }
      render() {
            console.log(this.state.list)
            return (
                  <div>
                        <div>Search bar</div>

                        <div>
                              {this.state.list?.map(({ image, firstName, description, _id }, id) => (

                                    <div className="block" key={id} style={{ display: "flex" }}>
                                          <NavLink to={`/provider/${_id}`} target={"_blank"}>
                                                <img src={image} />
                                          </NavLink>
                                          <div>
                                                <NavLink to={`/provider/${_id}`} target={"_blank"}>
                                                      <h3>{firstName}</h3>
                                                      <p>{description.substring(0, 100)}...</p>
                                                </NavLink>

                                                <ButtonAddFavoriteList idProvider={_id} />
                                                <button>CONTACT</button>
                                          </div>


                                    </div>

                              ))}
                        </div>

                        <div>
                            <MapSearch list={this.state.list}/>
                        </div>
                  </div >
            )
      }
}
