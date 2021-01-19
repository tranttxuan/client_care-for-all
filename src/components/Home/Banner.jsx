import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


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
                  <div>
                        <div className="banner">
                              <h2>Find trusted caregivers for your every need</h2>

                              <form onSubmit={this.handleSubmit}>
                                    <div>
                                          <h3 style={{ color: this.state.errors.err_service && "red" }}>To get started, choose an option</h3>
                                          <label className='label' htmlFor="childCare">Child care</label>
                                          <input
                                                id="childCare"
                                                type="radio"
                                                value="childCare"
                                                name="service"
                                                onChange={this.handleChange}

                                          />

                                          <label className='label' htmlFor="seniorCare">Senior care</label>
                                          <input
                                                id="seniorCare"
                                                type="radio"
                                                value="seniorCare"
                                                name="service"
                                                onChange={this.handleChange}

                                          />

                                          <label className='label' htmlFor="petCare">Pet care</label>
                                          <input
                                                id="petCare"
                                                type="radio"
                                                value="petCare"
                                                name="service"
                                                onChange={this.handleChange}

                                          />
                                          {this.state.errors.err_service && <p style={{ color: "red" }}>{this.state.errors.err_service}</p>}
                                    </div>

                                    <div>
                                          <h3 style={{ color: this.state.errors.err_option && "red" }}>What would you like to do?</h3>

                                          <label className='label' htmlFor="provider">Find a caregiver</label>
                                          <input
                                                id="provider"
                                                type="radio"
                                                value="providers"
                                                name="option"
                                                onChange={this.handleChange}
                                          />



                                          <label className='label' htmlFor="announcement">Find a job</label>
                                          <input
                                                id="announcement"
                                                type="radio"
                                                value="announcements"
                                                name="option"
                                                onChange={this.handleChange}
                                          />
                                          {this.state.errors.err_option && <p style={{ color: "red" }}>{this.state.errors.err_option}</p>}
                                    </div>
                                    <button>Search <i className="fas fa-search"></i></button>
                                    {this.state.errors.err_submit && <p style={{ color: "red" }}>{this.state.errors.err_submit}</p>}
                              </form>

                        </div>
                  </div>
            )
      }
}
export default withRouter(Banner)