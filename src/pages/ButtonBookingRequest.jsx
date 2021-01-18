import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler';

export default class ButtonBookingRequest extends Component {
      state = {
            booking: false,
      }
      booking = () => {
            this.setState({ booking: !this.state.booking });
            // const idProvider = this.props.match.params.idProvider;
            const idProvider = this.props.idProvider;

            if (!this.state.booking === true) {
                  apiHandler
                        .sendBookingRequest(idProvider)
                        .then(response => { console.log(response) })
                        .catch(err => {
                              console.log(err.message)
                              this.setState({ booking: false })
                        })
            } else {
                  apiHandler.cancelBookingRequest(idProvider)
                        .then(response => {
                              console.log(response)
                        })
                        .catch(err => { console.log(err.message) })
            }

      }
      render() {
            return (
                  <Fragment>
                        <button
                              onClick={this.booking} style={{ color: this.state.booking && "green" }}
                        >Booking request
                        </button>
                  </Fragment>

            )
      }
}

