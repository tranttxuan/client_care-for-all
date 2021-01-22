import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';
import ButtonAddFavoriteList from '../components/ButtonAddFavoriteList';
import Autocomplete from '../components/Map/AutoComplete';
import MapSearch from '../components/Map/MapSearch';
import { averageRates } from '../utils';
import Rating from "../components/Rate/Rating"
import FormMessage from '../components/Message/FormMessage';
import "../styles/Providers_Annc_Pages/Providers_Annc_Pages.css"

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

            const rev = []
            // console.log("average", averageRates(rev));
            return (
                  <div className="summary--public flex-column">
                        <div className="total--public__search">
                              <h2>Find providers near by your location</h2>
                              <Autocomplete onSelect={this.handleSelect} />

                        </div>

                        <div>
                              <MapSearch
                                    list={this.state.list}
                                    search={this.state.searchCoordinates && this.state.searchCoordinates} />
                        </div>


                        <div className="summary--public__container ">
                              <h3>{this.state.list.length} Providers</h3>
                              {this.state.list?.map(({ image, firstName, description, _id, reviews }, id) => (

                                    <div className="block flex-row" key={id} >
                                          <NavLink to={`/provider/${_id}`} target={"_blank"}>
                                                <img src={image} alt={firstName} />
                                          </NavLink>
                                          <div>
                                                <NavLink to={`/provider/${_id}`} target={"_blank"}>
                                                      <h3>{firstName} <i class="fas fa-external-link-alt"></i></h3>
                                                      <p>{description.substring(0, 100)}...</p>
                                                </NavLink>

                                                <Rating rate={averageRates(reviews) && averageRates(reviews)} />

                                                <div className="flex-row btn-list">
                                                      <ButtonAddFavoriteList idProvider={_id} />
                                                      <FormMessage idReceiver={_id} />
                                                </div>

                                          </div>

                                    </div>

                              ))}
                        </div>


                  </div >
            )
      }
}
