import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';
import ButtonAddFavoriteList from '../components/ButtonAddFavoriteList';
import ButtonBookingRequest from '../components/ButtonBookingRequest';
import Carousel from '../components/Carousel';
import MapSearch from '../components/Map/MapSearch';
import FormMessage from '../components/Message/FormMessage';
import OtherServices from '../components/Profile/components/OtherServices';
import Services from '../components/Profile/components/Services';
import { getAge } from '../utils';
import "../styles/Providers_Annc_Pages/One_Annc_Provider_Page.css"


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
                        if (data === "User does not share his profile") {
                              this.setState({ provider: "" })
                        } else {
                              console.log("fetch data", data)
                              this.setState({ provider: data[0] })
                        }

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
            if (!provider) {
                  return <h1 className="margin-top">Sorry. This user want not to share his/her profile</h1>
            }

            const { _id, firstName, lastName, description, image, service, additionalServices, experiences, availability, reviews, location, bookingList } = provider;
            // console.log("PROVIDER", provider)
            let age = '';
            if (provider.birthday) {
                  age = getAge(provider.birthday)
            }
            //if this provider is in the current user's favorite list 
            let isInFavList = false;

            if (this.context.user) {
                  if (this.context.user.favoriteProviders.includes(this.props.match.params.idProvider)) {
                        isInFavList = true;
                  }
            }

            return (
                  <div className="OnePackInformation">
                        <div className="OnePackInformation__header">
                              <div className="block flex-row header">
                                    <img src={image} alt={this.firstName} />

                                    <div >
                                          <h3><em>{firstName}</em> {lastName}</h3>
                                          {!isNaN(age) && <p>{age} years old</p>}
                                          <div className="btn-list flex-column">
                                                <div className="flex-row btn-list">
                                                      <ButtonAddFavoriteList
                                                            idProvider={this.props.match.params.idProvider}
                                                            isAdded={isInFavList}
                                                      />

                                                      <FormMessage idReceiver={_id} />
                                                </div>

                                                <div className="flex-column btn-list">
                                                      <NavLink to={{
                                                            pathname: `/provider/${this.props.match.params.idProvider}/review`,
                                                            state: { name: provider.firstName }
                                                      }} className="btn btn-action-2"
                                                      >Add Review</NavLink>
                                                      <ButtonBookingRequest bookingList={bookingList} idProvider={this.props.match.params.idProvider} />
                                                </div>

                                          </div>

                                    </div>
                              </div>

                              <div className="block">
                                    <h2>Hello, I am {firstName}</h2>
                                    <p>{description}</p>
                              </div>
                        </div>


                        <div className="block OnePackInformation__services">
                              <h2>Service offer:</h2>
                              <div className="flex-row-space-evenly">
                                    <Services defaultValue={service} editable="false" />
                              </div>

                              <h2>I'm comfortable with:</h2>
                              <div className="">
                                    <OtherServices defaultValue={additionalServices} editable="false" />
                              </div>

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
                              <h2>Reviews</h2>
                              {(!seeMore && reviews.length !== 0) && <button onClick={this.seeMore} className="btn btn-action-2">more reviews</button>}
                              {reviews.length !== 0 ? <Carousel reviews={reviews} /> : <p>0 reviews</p>}

                        </div>

                        {location.coordinates.length !== 0 && <div className="block">
                              <h2>Location</h2>

                              <MapSearch user={location} />
                        </div>}


                  </div>
            )
      }

}

export default withRouter(OneProvider);