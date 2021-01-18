import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';
import ButtonAddFavoriteList from '../components/ButtonAddFavoriteList';
import Carousel from '../components/Carousel';
import MapInCard from '../components/Map/MapInCard';
import OtherServices from '../components/Profile/components/OtherServices';
import Services from '../components/Profile/components/Services';
import ReviewCard from '../components/ReviewCard';
import { getAge } from '../utils';
import ButtonBookingRequest from './ButtonBookingRequest';

class OneProvider extends Component {
      static contextType = UserContext;
      state = {

            provider: null,
            seeMore: false
      }
      getData = (limit) => {
            apiHandler
                  .getOneProvider(this.props.match.params.idProvider, limit)
                  .then(data => {
                        // console.log("fetch data", data)
                        this.setState({ provider: data[0] })
                  })
                  .catch(err => console.log(err.message))
      }
      componentDidMount() {
            this.getData(4);
      }

      handleBack = () => {
            this.props.history.goBack();
      }

      seeMore = () => {
            this.getData(100);
            this.setState({ seeMore: true })
      }

      render() {
            const { provider, seeMore } = this.state;
            if (provider) {
                  const { firstName, lastName, description, image, service, additionalServices, experiences, availability, reviews, location, favoriteProviders } = provider;

                  let age = '';
                  if (provider.birthday) {
                        age = getAge(provider.birthday)
                  }

                  //if this provider is in the current user's favorite list 
                  let isInFavList = false;

                  if (this.context.user) {
                        console.log("here")
                        if (this.context.user.favoriteProviders.includes(this.props.match.params.idProvider)) {
                              isInFavList = true;
                              console.log("here1")
                        }
                  }

                  return (
                        <div>
                              <div>
                                    <button onClick={this.handleBack}><p><i className="fas fa-arrow-circle-left" /></p> Back</button>
                                    <NavLink to={{
                                          pathname: `/provider/${this.props.match.params.idProvider}/review`,
                                          state: { name: provider.firstName }
                                    }}
                                    >Add Review</NavLink>

                                    <ButtonAddFavoriteList
                                          idProvider={this.props.match.params.idProvider}
                                          isAdded={isInFavList}
                                    />
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

                                    <div className="block">
                                          <h2>Reviews</h2> {!seeMore && <button onClick={this.seeMore}>more reviews</button>}
                                          <Carousel reviews={reviews} />
                                    </div>

                                    {location.coordinates.length !== 0 && <div className="block">
                                          <h2>Location</h2>
                                          <MapInCard
                                                lat={location.coordinates[0]}
                                                lng={location.coordinates[1]}
                                          />
                                    </div>}
                              </div>
                              <br></br>
                              <br></br>
                              <br></br>
                              <div className="block">
                                    <button>Contact</button>
                                    <ButtonBookingRequest booking="true" idProvider={this.props.match.params.idProvider} />
                              </div>


                        </div>
                  )
            } else {
                  return ''
            }
      }

}

export default withRouter(OneProvider);