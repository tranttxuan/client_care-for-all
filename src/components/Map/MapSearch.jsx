import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { withRouter } from 'react-router-dom';
import "../../styles/Map.css"

const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});



class MapSearch extends Component {
      state = {
            lng: 2.349014, // Default lng and lat set to the center of paris.
            lat: 48.864716,
            zoom: 12, // used for map zoom level
      };

      componentDidMount() {
            // Get users geo location and set it as the state so the map centers relative to the users current location. :)
            const success = (position) => {
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  this.setState({ lat: latitude, lng: longitude });
            };

            const error = () => {
                  console.log("An error occured geolocating user");
            };

            if (!navigator.geolocation) {
                  console.log("Geolocation not supported");
            } else {
                  navigator.geolocation.getCurrentPosition(success, error);
            }
      }

      handleClick = (user) => {
          if(this.props.match.path.includes("/providers/")){
                this.props.history.push(`/provider/${user._id}`)
          }else{
            this.props.history.push(`/announcements/${user._id}`)
          }
      }
      onHover = () => {
            return <p style={{ position: "absolute" }}>Your position</p>
      }

      render() {
            // list is an object
            let User, List, Search;
            if (this.props.user) {
                  User = this.props.user;
            }
            if (this.props.list) {
                  List = this.props.list;
            }
            if(this.props.search){
                  Search = this.props.search.coordinates
            }
          
            return (
                  <div>

                        <Map
                              style={"mapbox://styles/mapbox/streets-v9"}
                              zoom={[8]}
                              containerStyle={{
                                    height: "20vh",
                                    width: "80vw",
                              }}
                              center={ Search|| [this.state.lng, this.state.lat]}
                              // [this.state.lng, this.state.lat]
                        >
                              {/* EACH PROVIDER / EACH ANNOUNCEMENT */}
                              {User && User.coordinates.length !== 0 && <Marker

                                    coordinates={User.coordinates}
                                    onClick={(e => this.handleClick(User))}
                              >
                                    <img className="marker user"
                                          src="https://toppng.com/uploads/preview/alerta-mty-google-map-cluster-ico-11562871468f1tab89byc.png"
                                          alt="marker"

                                    />
                                    <p>Page's address</p>
                              </Marker>}

                              {/* Providers / Announcements page  */}
                              {List && List.map((item, id) => {
                                    return (
                                          item.location && item.location.coordinates.length !== 0
                                          && <Marker
                                                key={id}
                                                coordinates={item.location.coordinates}
                                                onClick={(e => this.handleClick(item))}
                                          >
                                                <img className="marker item"
                                                      src="https://image.pngaaa.com/968/417968-middle.png"
                                                      alt="marker"

                                                />

                                                <p>{item.lastName} {item.firstName}</p>

                                          </Marker>

                                    )
                              })}


                              {/* YOUR CURRENT POSITION  */}
                              <Marker
                                    coordinates={[this.state.lng, this.state.lat]}

                              >
                                    <img className="marker current"
                                          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
                                          alt="marker"
                                    />
                                    <p>Your position</p>
                              </Marker>

                              {/* SEARCH  */}
                              {Search &&  <Marker
                                    coordinates={Search}

                              >
                                    <img className="marker search"
                                            src="https://toppng.com/uploads/preview/alerta-mty-google-map-cluster-ico-11562871468f1tab89byc.png"
                                          alt="marker"
                                    />
                                    
                              </Marker>}
                        </Map>
                  </div >
            )
      }
}
export default withRouter(MapSearch)