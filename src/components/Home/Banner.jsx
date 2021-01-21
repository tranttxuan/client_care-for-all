import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "../../styles/Home/Banner.css";
import Video from "../../styles/video.mp4"


class Banner extends Component {
      state = {
            service: '',
            option: '',
            errors: {
                  err_service: '',
                  err_option: '',
                  err_submit: ''
            }
      }
      handleChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
      }
      checkValidation = () => {
            let isValid = true;
            let errors = {};
            if (this.state.service === '') {
                  errors.err_service = 'Please choose one option';
                  isValid = false;
            }
            if (this.state.option === '') {
                  errors.err_option = 'Please choose one option';
                  isValid = false;
            }
            this.setState({ errors });
            setTimeout(() => {
                  this.setState({ errors: "" });
            }, 3000);

            return isValid;
      }
      handleSubmit = (event) => {
            event.preventDefault();

            if (this.checkValidation()) {

                  if (this.state.option === "announcements") {
                        this.props.history.push(`/announcements/${this.state.service}/s`)
                  } else if (this.state.option === "providers") {
                        this.props.history.push(`/providers/${this.state.service}/s`)
                  }
            } else {
                  this.setState(prevState => ({
                        errors: { ...prevState.errors, err_submit: "Try again!" }
                  }));
            }

      }

      render() {
            return (

                  <div className="banner flex-column">
                        <div class="bg-video">
                              <video autoPlay="autoplay" loop="loop" muted  >
                                    <source src={Video} type="video/mp4" />

                              </video>
                        </div>

                        <h2>Find trusted caregivers for your every need</h2>

                        <form onSubmit={this.handleSubmit} className="block">
                              <div>
                                    <h3>To get started, choose an option</h3>

                                    <input
                                          id="childCare"
                                          type="radio"
                                          value="childCare"
                                          name="service"
                                          onChange={this.handleChange}

                                    />
                                    <label className='label' htmlFor="childCare">Child care</label>

                                    <input
                                          id="seniorCare"
                                          type="radio"
                                          value="seniorCare"
                                          name="service"
                                          onChange={this.handleChange}

                                    />
                                    <label className='label' htmlFor="seniorCare">Senior care</label>

                                    <input
                                          id="petCare"
                                          type="radio"
                                          value="petCare"
                                          name="service"
                                          onChange={this.handleChange}

                                    />
                                    <label className='label' htmlFor="petCare">Pet care</label>
                                    {this.state.errors.err_service && <p style={{ color: "red" }}>{this.state.errors.err_service}</p>}
                              </div>

                              <div>
                                    <h3>What would you like to do?</h3>

                                    <input
                                          id="provider"
                                          type="radio"
                                          value="providers"
                                          name="option"
                                          onChange={this.handleChange}
                                    />
                                    <label className='label' htmlFor="provider">Find a caregiver</label>



                                    <input
                                          id="announcement"
                                          type="radio"
                                          value="announcements"
                                          name="option"
                                          onChange={this.handleChange}
                                    />
                                    <label className='label' htmlFor="announcement">Find a job</label>

                                    {this.state.errors.err_option && <p style={{ color: "red" }}>{this.state.errors.err_option}</p>}
                              </div>
                              <div className="flex-column">
                                    <button className="btn btn__search">Search <i className="fas fa-search"></i></button>
                                    {this.state.errors.err_submit && <p style={{ color: "red" }}>{this.state.errors.err_submit}</p>}
                              </div>

                        </form>

                  </div>
            )
      }
}
export default withRouter(Banner)