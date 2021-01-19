import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import SearchFeature from '../components/Auth/SearchFeature';
import UserContext from '../components/Auth/UserContext';
import ButtonAddFavoriteList from '../components/ButtonAddFavoriteList';
import Autocomplete from '../components/Map/AutoComplete';
import MapSearch from '../components/Map/MapSearch';
import { averageRates } from '../utils';
import Rating from "../components/Rate/Rating"

export default class Providers extends Component {
      static contextType = UserContext;
      state = {
            list: [],
            searchCoordinates: []

      }
      componentDidMount() {
            const service = this.props.match.params.service;
            apiHandler.getProvidersByService(service)
                  .then(data => this.setState({ list: data }))
                  .catch(err => console.log(err))
      }
      handleSelect = (place) => {
            this.setState({ searchCoordinates: place.geometry })
      }
      render() {
            console.log("check list", this.state.list[1]?.reviews)
            const rev = []
            console.log("average", averageRates(rev));
            return (
                  <div>
                        <div style={{ marginBottom: "5rem" }}>
                              <h3>Find providers near by your location</h3>
                              <Autocomplete onSelect={this.handleSelect} />

                        </div>

                        <div>
                              <MapSearch
                                    list={this.state.list}
                                    search={this.state.searchCoordinates && this.state.searchCoordinates} />
                        </div>

                        <div>
                              <SearchFeature searchProvider={true} list={this.state.list} />
                        </div>

                        <div>
                              {this.state.list?.map(({ image, firstName, description, _id, reviews }, id) => (

                                    <div className="block" key={id} style={{ display: "flex" }}>
                                          <NavLink to={`/provider/${_id}`} target={"_blank"}>
                                                <img src={image} alt={firstName} />
                                          </NavLink>
                                          <div>
                                                <NavLink to={`/provider/${_id}`} target={"_blank"}>
                                                      <h3>{firstName}</h3>
                                                      <p>{description.substring(0, 100)}...</p>
                                                </NavLink>

                                                <Rating rate={averageRates(reviews) && averageRates(reviews)} />


                                                <ButtonAddFavoriteList idProvider={_id} />
                                                <button>CONTACT</button>
                                          </div>


                                    </div>

                              ))}
                        </div>


                  </div >
            )
      }
}
