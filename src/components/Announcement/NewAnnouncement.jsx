import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import UserContext from '../Auth/UserContext'
import AutocompletePlace from '../Map/AutoComplete';
import PopUp from '../PopUp';
import OtherServices from '../Profile/components/OtherServices';
import Services from '../Profile/components/Services';
class NewAnnouncement extends Component {
      static contextType = UserContext;
      state = {
            title: '',
            description: '',
            formattedAddress: '',
            location: '',
            time: '',
            service: null,
            additionalServices: null,
            displayMessage: false,
            idPost: '',
            isEditPage: false,
            error: ''

      }
      componentDidMount() {

            if (this.props.match.params.idPost) {
                  this.setState({ isEditPage: true, displayMessage: false,  })
                  apiHandler.getOneAnnouncement(this.props.match.params.idPost)
                        .then(data => {
                              const { title, description, formattedAddress, service, additionalServices, time } = data;
                              this.setState({ title, description, formattedAddress, service, additionalServices, time });
                        })
                        .catch(err => console.log(err))
            }
      }


      handleChange = (event) => {
            const { name, value } = event.target;
            this.setState({ [name]: value });
      }
      handlePlace = (place) => {
            const location = place.geometry;
            const formattedAddress = place.place_name;
            this.setState({ location, formattedAddress })
      }
      handleServices = (name, checked) => {
            console.log("service", name, checked)
            this.setState({ service: { ...this.state.service, [name]: checked } })
      }
      handleAdditionalServices = (name, checked) => {
            this.setState({ additionalServices: { ...this.state.additionalServices, [name]: checked } })
      }
      handleSubmit = (event) => {
            event.preventDefault();
            const { error, isEditPage, idPost, displayMessage, ...data } = this.state;
            if (this.props.match.params.idPost) {
                  console.log(data)
                  apiHandler.updateOneAnnouncement(data, this.props.match.params.idPost)
                        .then(data => {
                              this.setState({ displayMessage: true, idPost: data._id });
                        })
                        .catch(err => {
                              this.setState({ error: err.message })
                        });
            } else {
                  apiHandler.createAnnouncement(data)
                        .then(data => {
                              this.setState({ displayMessage: true, idPost: data._id });
                        })
                        .catch(err => {
                              this.setState({ error: err.message })
                        })
            }
      }

      render() {
            const { error, displayMessage, idPost, isEditPage, ...states } = this.state
            const { service, time, title, description, additionalServices, formattedAddress } = states;
console.log("value", service, additionalServices)
            return (
                  <Fragment>
                        {error && <p>error</p>}
                        <form onSubmit={this.handleSubmit}>
                              <div className="block">
                                    <h2>What kind of service do you offer?</h2>
                                    <div className="form-group">
                                          {!this.props.match.params.idPost
                                                ? (<Services
                                                      defaultValue={service}
                                                      handleServices={this.handleServices}
                                                />)
                                                : [service && <Services
                                                      defaultValue={service}
                                                      handleServices={this.handleServices}
                                                />]
                                          }

                                    </div>

                                    <h2>Other service</h2>
                                    <div className="form-group">
                                          {!this.props.match.params.idPost
                                                ? (<OtherServices
                                                      defaultValue={this.state.additionalServices}
                                                      handleServices={this.handleAdditionalServices}
                                                />)
                                                : [additionalServices && <OtherServices
                                                      defaultValue={additionalServices}
                                                      handleServices={this.handleAdditionalServices}
                                                />]
                                          }

                                    </div>
                              </div>

                              <div className="block">
                                    <div className="form-group">
                                          <label className='label' htmlFor="title">Title</label>
                                          <input
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={title}
                                                onChange={this.handleChange}
                                          />
                                    </div>

                                    <div className="form-group">
                                          <label className='label' htmlFor="description">Description</label>
                                          <textarea
                                                rows="10"
                                                id="description"
                                                type="text"
                                                name="description"
                                                value={description}
                                                onChange={this.handleChange}
                                          />
                                    </div>
                              </div>

                              <div className="block margin-bottom">
                                    <div className="form-group">
                                          <label className='label' htmlFor="formattedAddress">Address</label>
                                          {this.props.match.params.idPost
                                                && <p>Your current address: {formattedAddress}</p>}
                                          <AutocompletePlace onSelect={this.handlePlace} />
                                    </div>


                                    <div className="form-group">
                                          <label className='label' htmlFor="time">Time</label>
                                          <input
                                                id="time"
                                                type="text"
                                                name="time"
                                                value={time}
                                                onChange={this.handleChange}
                                          />
                                    </div>
                              </div>

                              <button className="btn btn-action">{isEditPage ? "Edit" : "Post"}</button>
                        </form>
                        {displayMessage && <PopUp
                              message={isEditPage ? "Successfully updated this announcement" : "Successfully posted an announcement"}
                              btnOne="Edit"
                              handleBtnOne={() => {
                                    this.props.history.push(`/announcements/edit/${idPost}`)
                                    window.location.reload();
                              }}
                              btnTwo="Dashboard"
                              handleBtnTwo={() => this.props.history.push("/profile")}

                        />}
                  </Fragment>
            )
      }
}

export default withRouter(NewAnnouncement);