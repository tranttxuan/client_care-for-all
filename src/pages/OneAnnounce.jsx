import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiHandler from '../api/apiHandler';
import ApplyJob from '../components/ApplyJob';
import MapInCard from '../components/Map/MapInCard';
import OtherServices from '../components/Profile/components/OtherServices';
import Services from '../components/Profile/components/Services';

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
            console.log("check", this.state.announcement)
            if (this.state.announcement) {
                  const {_id, author, service, additionalServices, title, description, location } = this.state.announcement;
                  const { firstName, lastName, image } = author;
                  return (
                        <div>
                              <div className="block">
                                    <div style={{ display: 'flex' }}>
                                          <img src={image} />
                                          <p>Hello, my name is {lastName} {firstName}</p>
                                    </div>


                              </div>
                              <div className="block">
                                    <p><em>Title</em> <strong>{title}</strong></p>
                                    <p><em>Description: </em>{description}</p>
                              </div>

                              <div className="block">
                                    <h2>Requires</h2>
                                    <Services defaultValue={service} />
                                    <OtherServices defaultValue={additionalServices} />
                              </div>

                              <div className="block">
                                    <MapInCard />
                              </div>
                              <br></br>
                              <br></br>
                              <div className="block">
                                    <button>Contact me</button>
                                    <ApplyJob id={_id}/>
                              </div>
                        </div>


                  )
            } else {
                  return (
                        <div>Loading...</div>
                  )

            }

      }
}

export default withRouter(OneAnnounce)