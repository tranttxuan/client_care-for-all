import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler';
import UserContext from './Auth/UserContext';

export default class ButtonBookingRequest extends Component {
      static contextType = UserContext;
      state = {
            bookingList: [],
            message: ''
      }
      componentDidMount() {
            this.setState({ bookingList: this.props.bookingList })
      }
      booking = () => {

            // const idProvider = this.props.match.params.idProvider;
            const idProvider = this.props.idProvider;

            if (!this.bookedProvider()) {
                  apiHandler
                        .sendBookingRequest(idProvider)
                        .then(response => {
                              if (response.message === "It seems you do not need a care provider!") {
                                    this.setState({ message: "It's you!" })
                                    setTimeout(() => {
                                          this.setState({ message: "" })
                                    }, 5000);
                              } else {
                                    this.setState({ bookingList: response.bookingList })
                              }
                        })
                        .catch(err => {
                              console.log(err.message)
                              this.setState({ booking: false })
                        })
            } else {
                  apiHandler.cancelBookingRequest(idProvider)
                        .then(response => this.setState({ bookingList: response.bookingList }))
                        .catch(err => { console.log(err.message) })
            }

      }
      bookedProvider = () => {
            return this.state.bookingList.includes(this.context.user?._id)
      }
      render() {
            return (
                  <Fragment>
                        <button
                              onClick={this.booking}
                              style={{ color: this.bookedProvider() && "green" }}
                        >
                              {this.bookedProvider() ? "Booked" : "Booking request"}
                        </button>
                        {this.state.message && <p>{this.state.message}</p>}
                  </Fragment>

            )
      }
}

