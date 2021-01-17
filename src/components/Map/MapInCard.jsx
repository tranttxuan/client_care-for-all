import React, { Component } from 'react';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      accessToken: "pk.eyJ1IjoidHJhbngiLCJhIjoiY2tqZzR2M2RhMG1mNjJ5bG9wbTF2Z3EwaSJ9.s4CffQ9GjURVeHVpgekb1A",
});

export default class MapInCard extends Component {
      state = {
            lat: 2.349014, // Default lng and lat set to the center of paris.
            lng: 48.864716,
      };
      render() {
            
            return (
                  <div>
                        <Map
                              style="mapbox://styles/mapbox/streets-v9"
                              containerStyle={{ height: "20vh", width: "80vw" }}
                              zoom={[10]}
                              center={[this.state.lat, this.state.lng]}
                        >

                              {/* <Marker coordinates={[this.props.lat, this.props.lng]}>
                                    <img
                                          src="https://img.icons8.com/color/48/000000/marker.png"
                                          alt="marker"
                                          style={{width:'10', height:'10'}}
                                    />
                              </Marker> */}
                        </Map>
                  </div>
            )
      }
}
