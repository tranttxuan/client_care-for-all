import React, { Component } from 'react'
import { buildFormData } from '../../utils';
import UserContext from '../Auth/UserContext'
import AutoComplete from '../AutoComplete';
import UploadWidget from '../UploadWidget';
import BirthdayFields from './components/BirthdayFields';
import OtherServices from './components/OtherServices';
import Services from './components/Services';
import VisibilityField from './components/VisibilityField';


export default class EditProfile extends Component {
      static contextType = UserContext;

      state = {
            user: null,
            image: '',
            defaultValue: ''
      }

      imageRef = React.createRef();

      componentDidMount() {
            this.setState({
                  user: this.context.user,
                  defaultValue: this.context.user.formattedAddress
            })
      }

      handleChange = (event) => {
            const { name, value } = event.target;
            this.setState({ user: { ...this.state.user, [name]: value } })
      }

      handleFileSelect = (tempUrl) => {
            this.setState({ image: tempUrl })
      }
      handleBirthday = (value) => {
            const birthday = `${value.year}-${value.month}-${value.day}`;
            this.setState({ user: { ...this.state.user, birthday } })
      }
      handlePlace = (place) => {
            const location = place.geometry;
            const formattedAddress = place.place_name;
            this.setState({ user: { ...this.state.user, location, formattedAddress } })
      }
      handleVisibility = (value) => {
            this.setState({ user: { ...this.state.user, isProvider: value } })
      }
      handleServices = (name, checked) => {
            console.log(name, checked)
            this.setState({ user: { ...this.state.user, service: { ...this.state.user.service, [name]: checked } } })
      }
      handleAdditionalServices = (name, checked) => {
            console.log(name, checked)
            this.setState({ user: { ...this.state.user, additionalServices: { ...this.state.user.additionalServices, [name]: checked } } })
      }
      checkValidation = () => {
            console.log(this.state.user.birthday)
      }
      handleSubmit = (event) => {
            event.preventDefault();
            console.log(this.state.user)
      }

      render() {

            // console.log("lala", this.state?.user?.lastName)
            return (
                  this.state.user ?
                        <div>
                              <h1>Edit your profile</h1>

                              <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: "column" }}>

                                    <div className="block">
                                          <h2>Profile status</h2>
                                          {this.state.user.isProvider
                                                ? <h3>Your profile appears in the search results</h3>
                                                : <h3>Your profile does not appear in the search results yet</h3>
                                          }
                                    </div>

                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <img src={this.state.image || this.context.user.image} alt={this.state.user.firstName} />
                                          <div className="form-group">
                                                <UploadWidget
                                                      onFileSelect={this.handleFileSelect}
                                                      name="image"
                                                      ref={this.imageRef}
                                                >
                                                      Upload image
                                          </UploadWidget>
                                          </div>
                                    </div>


                                    <br></br>
                                    <br></br>
                                    <div className="block">

                                          <div className="form-group">
                                                <label className='label' htmlFor="firstName">First Name</label>
                                                <input
                                                      id="firstName"
                                                      type="text"
                                                      name="firstName"
                                                      value={this.state.user.firstName}
                                                      onChange={this.handleChange}
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="lastName">Last name</label>
                                                <input
                                                      id="lastName"
                                                      type="text"
                                                      name="lastName"
                                                      value={this.state.user.lastName}
                                                      onChange={this.handleChange}

                                                />
                                          </div>


                                          <div className="form-group">
                                                <label className='label' htmlFor="birthday">Date of birth yyyy/mm/dd</label>
                                                <BirthdayFields
                                                      birthdayValue={this.state.user.birthday && this.state.user.birthday}
                                                      handleBirthday={this.handleBirthday}
                                                />

                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="email">Email</label>
                                                <input
                                                      id="email"
                                                      type="text"
                                                      name="email"
                                                      value={this.state.user.email}
                                                      onChange={this.handleChange}
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="password">Password</label>
                                                <input
                                                      id="password"
                                                      type="password"
                                                      name="password"
                                                      value={this.state.user.password}
                                                      onChange={this.handleChange}
                                                      placeholder="*********"
                                                />
                                          </div>

                                    </div>

                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <div className="form-group">
                                                <label className='label' htmlFor="formattedAddress">Address</label>
                                                <AutoComplete
                                                      onSelect={this.handlePlace}
                                                      defaultValue={this.state.defaultValue} />
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="phoneNumber">Phone Number</label>
                                                <input
                                                      id="phoneNumber"
                                                      type="text"
                                                      name="phoneNumber"
                                                      value={this.state.user.phoneNumber}
                                                      onChange={this.handleChange}
                                                      placeholder="06.90.60.90"
                                                />
                                          </div>

                                    </div>

                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <h2>About me</h2>
                                          <div className="form-group">
                                                <label className='label' htmlFor="description">Description</label>
                                                <textarea
                                                      rows="10"
                                                      id="description"
                                                      type="text"
                                                      name="description"
                                                      value={this.state.user.description}
                                                      onChange={this.handleChange}
                                                />
                                          </div>

                                    </div>

                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <h2>Experiences & Skills</h2>

                                          <div className="form-group">
                                                <div className="form-group">
                                                      <label className='label' htmlFor="experiences">Experiences</label>
                                                      <textarea
                                                            rows="10"
                                                            id="experiences"
                                                            type="text"
                                                            name="experiences"
                                                            value={this.state.user.experiences}
                                                            onChange={this.handleChange}
                                                      />
                                                </div>
                                          </div>
                                    </div>

                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <h2>Who can see your profile</h2>
                                          <div className="form-group">
                                                <VisibilityField
                                                      defaultValue={this.state.user.isProvider}
                                                      handleVisibility={this.handleVisibility}
                                                />
                                          </div>

                                    </div>

                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <h2>What would you like to do?</h2>
                                          <div className="form-group">
                                                <Services
                                                      defaultValue={this.state.user.service}
                                                      handleServices={this.handleServices}

                                                />
                                          </div>

                                          <h2>Other service</h2>
                                          <div className="form-group">

                                                <OtherServices
                                                      defaultValue={this.state.user.additionalServices}
                                                      handleServices={this.handleAdditionalServices}

                                                />
                                          </div>
                                    </div>



                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <h2>Availability</h2>
                                          <div className="form-group">
                                                <input
                                                      id="availability"
                                                      type="text"
                                                      name="availability"
                                                      value={this.state.user.availability}
                                                      onChange={this.handleChange}
                                                />
                                          </div>

                                    </div>

                                    <button>Edit</button>
                              </form>
                        </div>
                        : <h1>Loading ...</h1>
            )

      }
}
