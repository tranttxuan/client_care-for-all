import React, { Component } from 'react';
import ReactMapboxGl, { Feature, Layer } from 'react-mapbox-gl';


const Map = ReactMapboxGl({
      // accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      accessToken: "pk.eyJ1IjoidHJhbngiLCJhIjoiY2tqZzR2M2RhMG1mNjJ5bG9wbTF2Z3EwaSJ9.s4CffQ9GjURVeHVpgekb1A",
});

const Img = new Image(10, 10);
// Img.src = "/../../images/heart.svg";
Img.src = "/media/marker.svg";

export default class MapSearch extends Component {
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

      render() {
            const listUsers = this.props.list ? this.props.list : [];
            console.log(listUsers)
            return (
                  <div>

                        <Map
                              style="mapbox://styles/mapbox/streets-v9"
                              zoom={[8]}
                              containerStyle={{
                                    height: "20vh",
                                    width: "80vw",
                              }}
                              center={[this.state.lng, this.state.lat]}
                        >

                              <Layer
                                    type="symbol"
                                    id="vinegars"
                                    images={["icon", Img]}
                              >
                                    {/* {listUsers?.map((user, index) => (
                                          <Feature
                                                key={index}
                                                // onClick={(event) => this.handleClick(item)}
                                                coordinates={user.coordinates}
                                          />
                                    ))} */}
                                    <Feature
                                          // onClick={(event) => this.handleClick(item)}
                                          coordinates={listUsers.coordinates}
                                    />
                              </Layer>
                        </Map>
                  </div>
            )
      }
}
