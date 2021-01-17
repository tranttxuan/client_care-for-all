import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import OtherServices from '../components/Profile/components/OtherServices';
import Services from '../components/Profile/components/Services';
import { getAge } from '../utils';

class OneProvider extends Component {
      state = {
            isFavorite: false,
            provider: null,
      }
      getData = () => {
            apiHandler
                  .getOneProvider(this.props.match.params.idProvider)
                  .then(data => { this.setState({ provider: data[0] }) })
                  .catch(err => console.log(err.message))
      }
      componentDidMount() {
            this.getData();

      }

      handleBack = () => {
            this.props.history.goBack();
      }

      addToFavorite = () => {
            this.setState({ isFavorite: !this.state.isFavorite });
            const idProvider = this.props.match.params.idProvider;

            if (!this.state.isFavorite === true) {
                  apiHandler
                        .addToFavoriteList(idProvider)
                        .then(response => { console.log(response) })
                        .catch(err => {
                              console.log(err.message)
                              this.setState({ isFavorite: false })
                        })
            } else {
                  apiHandler.takeOffFavoriteList(idProvider)
                        .then(response => {
                              console.log(response)
                        })
                        .catch(err => { console.log(err.message) })
            }
      }
      render() {
            const { isFavorite, provider } = this.state;
            if (provider) {
                  const { firstName, lastName, description, image, service, additionalServices, experiences, availability } = provider
                  let age = '';
                  if (provider) {
                        if (provider.birthday) {
                              age = getAge(provider.birthday)
                        }
                  }
                  console.log(provider)

                  return (
                        <div>
                              <div>
                                    <button onClick={this.handleBack}><p><i className="fas fa-arrow-circle-left" /></p> Back</button>
                                    <NavLink to={{
                                          pathname: `/provider/${this.props.match.params.idProvider}/review`,
                                          state: { name: provider.firstName }
                                    }} >Add Review</NavLink>

                                    {/* <NavLink to={`/provider/${this.props.match.params.idProvider}/review`}>REview</NavLink> */}
                                    <button onClick={this.addToFavorite}>
                                          {isFavorite
                                                ? <i className="fas fa-heart" style={{ color: "red" }} />
                                                : <i className="far fa-heart solid" />}
                                    </button>
                              </div>

                              <div>
                                    <div className="block">
                                          <img src={image} alt={this.firstName} />
                                          <p>{firstName} <strong>{lastName}</strong></p>
                                          {age && <p>{age} years old</p>}
                                    </div>

                                    <div className="block">
                                          <h2>Hello, I am {firstName}</h2>
                                          <p>{description}</p>
                                    </div>

                                    <div className="block">
                                          <h2>Service offer:</h2>
                                          <Services defaultValue={service} />
                                          <h2>I'm comfortable with:</h2>
                                          <OtherServices defaultValue={additionalServices} />
                                    </div>

                                    <div className="block">
                                          <h2>Skills and Experiences</h2>
                                          <p>{experiences}</p>
                                    </div>

                                    <div className="block">
                                          <h2>Availability</h2>
                                          <p>{availability}</p>
                                    </div>
                                    
                                    <div>
                                        review  map
                                    </div>
                              </div>


                        </div>
                  )
            } else {
                  return ''
            }
      }

}

export default withRouter(OneProvider);