import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
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
            errors: {
                  err_submit: '',
                  err_submit_success: '',
                  err_birthday: '',
                  err_lastName: '',
                  err_firstName: '',
                  err_password: '',
                  err_email: ''
            }
      }

      imageRef = React.createRef();

      componentDidMount() {
            this.setState({
                  user: this.context.user
            });
            console.log(this.context)
      }

      handleChange = (event) => {
            // const { name, value } = event.target;
            const value = event.target.type === "file" ? event.target.files[0] : event.target.value;
            const name = event.target.name;
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
            const { lastName, firstName, email, password, birthday } = this.state.user;
            let errors = {};
            let isValid = true;

            //check name
            if (!firstName) {
                  isValid = false;
                  errors.err_firstName = 'Please enter your first name';
            }

            if (!lastName) {
                  isValid = false;
                  errors.err_lastName = 'Please enter your last name';
            }

            //check email
            if (!email) {
                  errors.err_email = 'Please enter your email correctly';
                  isValid = false;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                  errors.err_email = 'Email address is invalid';
                  isValid = false;
            }

            //check password
            if (password !== undefined) {
                  if (password.length < 6) {
                        isValid = false;
                        errors.err_password = "Enter a password, minimum of 6 characters, 1 uppercase, 1 lowercase and 1 number digit";
                  }
            }


            //check birthday
            const isValidBirthday = new Date(birthday);

            const currentDate = new Date();
            if (isValidBirthday === "Invalid Date") {
                  errors.err_birthday = 'Please enter the correct format of your date of birth';
                  isValid = false;
            }
            if ((currentDate - isValidBirthday) < 0) {
                  errors.err_birthday = 'Check your birth year';
                  isValid = false;
            }

            this.setState({ errors });

            setTimeout(() => {
                  this.setState({ errors: "" });
            }, 5000);


            return isValid;
      }

      handleSubmit = (event) => {
            event.preventDefault();

            if (this.checkValidation()) {
                  const fd = new FormData();
                  const { errors, image, ...user } = this.state;

                  buildFormData(fd, user);

                  if (this.imageRef.current.files[0]) {
                        fd.append("image", this.imageRef.current.files[0]);
                  }

                  apiHandler.updateProfile(fd)
                        .then(data => {
                              console.log(data)
                              if (data.message === "Email already taken") {
                                    this.setState(prevState => ({
                                          errors: { ...prevState.errors, err_submit: "Email already taken", err_email: "Email already taken" }
                                    }));
                              }
                              else if (data.message === "Please make your password at least 6 characters, that contains at least one uppercase, one lowercase and one number digit in it, for security purposes.") {
                                    this.setState(prevState => ({
                                          errors: { ...prevState.errors, err_submit: "Check your new password", err_password: "Please make your password at least 6 characters, that contains at least one uppercase, one lowercase and one number digit in it, for security purposes." }
                                    }));
                              } else {
                                    this.context.setUser(data);

                                    this.setState(prevState => ({
                                          errors: { ...prevState.errors, err_submit_success: "Successfully updated your profile" }
                                    }));

                              }

                        })
                        .catch(err => {
                              this.setState(prevState => ({
                                    errors: { ...prevState.errors, err_submit: err.message }
                              }));
                        })

            } else {
                  this.setState(prevState => ({
                        errors: { ...prevState.errors, err_submit: "Please check again your information!" }
                  }));
            }

      }

      render() {
            const { errors } = this.state;
            const { err_lastName, err_firstName, err_email, err_password, err_submit, err_birthday, err_submit_success } = errors;
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
                                                      className={err_firstName ? "input failure" : 'input success'}
                                                      id="firstName"
                                                      type="text"
                                                      name="firstName"
                                                      value={this.state.user.firstName}
                                                      onChange={this.handleChange}
                                                />
                                                {err_firstName && <p className="failure">{err_firstName}</p>}
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="lastName">Last name</label>
                                                <input
                                                      className={err_lastName ? "input failure" : 'input success'}
                                                      id="lastName"
                                                      type="text"
                                                      name="lastName"
                                                      value={this.state.user.lastName}
                                                      onChange={this.handleChange}
                                                />
                                                {err_lastName && <p className="failure">{err_lastName}</p>}
                                          </div>


                                          <div className="form-group">
                                                <label className='label' htmlFor="birthday">Date of birth yyyy/mm/dd</label>
                                                <BirthdayFields
                                                      birthdayValue={this.state.user.birthday && this.state.user.birthday}
                                                      handleBirthday={this.handleBirthday}
                                                      className={err_birthday ? "input failure" : 'input success'}
                                                />
                                                {err_birthday && <p className="failure">{err_birthday}</p>}
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="email">Email</label>
                                                <input
                                                      className={err_email ? "input failure" : 'input success'}
                                                      id="email"
                                                      type="text"
                                                      name="email"
                                                      value={this.state.user.email}
                                                      onChange={this.handleChange}
                                                />
                                                {err_email && <p className="failure">{err_email}</p>}
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="password">Password</label>
                                                <input
                                                      className={err_password ? "input failure" : 'input success'}
                                                      id="password"
                                                      type="password"
                                                      name="password"
                                                      value={this.state.user.password}
                                                      onChange={this.handleChange}
                                                      placeholder="*********"
                                                />
                                                {err_password && <p className="failure">{err_password}</p>}
                                          </div>

                                    </div>

                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <div className="form-group">
                                                <label className='label' htmlFor="formattedAddress">Address</label>
                                                <AutoComplete
                                                      onSelect={this.handlePlace}
                                                      defaultValue={this.context.user.formattedAddress} />
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="phoneNumber">Phone Number</label>
                                                <input
                                                      id="phoneNumber"
                                                      type="text"
                                                      name="phoneNumber"
                                                      required="required"
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

                                    <button onClick={this.handleClick} className={err_submit_success ? "success" : ''}>Edit</button>
                                    {err_submit && <p className="failure">{err_submit}</p>}
                                    {err_submit_success && <p className="success">{err_submit_success}</p>}
                              </form>
                        </div>
                        : <h1>Loading ...</h1>
            )

      }
}
