import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import UserContext from '../Auth/UserContext'
import "../../styles/FormMessage.css"


class FormMessage extends Component {
      static contextType = UserContext;
      state = {
            message: '',
            errors: {
                  err_submit: '',
                  err_auth: ''
            },
            isDisplayed: false
      }
      showForm = () => {
            this.setState({ isDisplayed: true })
      }
      closeForm = () => {
            this.setState({ isDisplayed: false })
      }
      handleChange = (event) => {
            this.setState({ message: event.target.value })
      }
      checkValidation = () => {
            let isValid = true;
            let errors = {}
            if (this.state.message === '') {
                  errors.err_submit = "Please write your message"
                  isValid = false;
            }

            if (!this.context.user) {
                  errors.err_auth = `Please log in before sending a message`
                  isValid = false;
            }
            this.setState({ errors: errors })
            setTimeout(() => {
                  this.setState({ errors: {} })
            }, 5000);
            return isValid;
      }
      handleSubmit = (event) => {
            event.preventDefault();
            if (this.checkValidation()) {
                  const data = {};
                  data.sender = this.context.user._id;
                  data.receiver = this.props.idReceiver;
                  data.message = this.state.message;
                  data.announcement = this.props.idAnnouncement;
                  console.log(data)
                  apiHandler.sendMessage(data)
                        .then(response => {
                              console.log("check here", response)
                              if (data.message === "You are sending a message to yourself!") {
                                    this.setState(prevState => ({
                                          errors: { ...prevState.errors, err_submit: response.message }
                                    }))
                              } else {
                                    this.setState(prevState => ({
                                          errors: { ...prevState.errors, err_submit: "Your message sent" }
                                    }))
                                    
                                    setTimeout(() => {
                                          this.setState({ isDisplayed: false })
                                    }, 5000);
                              }
                        })
                        .catch(err => {
                              this.setState(prevState => ({
                                    errors: { ...prevState.errors, err_submit: err.message }
                              }))
                              setTimeout(() => {
                                    this.setState({ isDisplayed: false })
                              }, 3000);
                        }

                        )
            }
      }

      render() {

            return (
                  <div>
                        <button onClick={this.showForm} className="btn btn-action">Contact</button>

                        <div style={{ display: this.state.isDisplayed ? "block" : "none" }} className="overlay">
                              <form onSubmit={this.handleSubmit} className="contact-announcement block--center flex-column">
                                    <h3>Announcement title: {this.props.title}</h3>

                                    <label htmlFor="message"><strong>Your message</strong></label>
                                    <textarea
                                          rows="10"
                                          value={this.state.message}
                                          name="message"
                                          onChange={this.handleChange}
                                    />
                                    <button className="btn btn-action-1">Send</button>
                                    {this.state.errors.err_submit && <p className="error-message">{this.state.errors.err_submit}</p>}
                                    {this.state.errors.err_auth
                                          && <p  className="error-message">{this.state.errors.err_auth} 
                                                <strong className="btn__login"><NavLink to="/login"> Log in</NavLink></strong></p>}
                              </form>
                              <button onClick={this.closeForm} className="btn btn-action-1">X</button>
                        </div>

                  </div>
            )
      }
}
export default FormMessage