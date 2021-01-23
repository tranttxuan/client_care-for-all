import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler';
import PopUp from '../components/PopUp';
import Rating from '../components/Rate/Rating';
import { withRouter } from 'react-router-dom';

class AddReview extends Component {
      state = {
            review: '',
            rate: '',
            error: '',
            displayMessage: false
      }
      handleChange = (event) => {
            this.setState({ [event.target.name]: event.target.value });
      }
      addStarRating = (rate) => {
            this.setState({ rate: rate + 1 })
      }
      handleSubmit = (event) => {
            event.preventDefault();
            const { displayMessage, error, ...data } = this.state;
            if (data.review === '') {
                  this.setState({ error: "Write your review" })
                  setTimeout(() => {
                        this.setState({ error: "" })
                  }, 3000);
            } else {
                  // console.log("data", data)
                  if (this.props.match.params.idProvider) {
                        apiHandler.addReview(data, this.props.match.params.idProvider)
                              .then(response => {
                                    if (response.message === "Successfully added a review") {
                                          this.setState({ displayMessage: true });
                                    } else {
                                          this.setState({ error: response.message })
                                    }
                              })
                              .catch(err => {
                                    console.log(err.message)
                                    this.setState({ error: err.message })
                              })
                  } else {
                        // console.log("data", data)
                        apiHandler.addWebReview(data)
                              .then(response => {
                                    this.setState({ displayMessage: true });
                              })
                              .catch(err => {
                                    console.log(err.message)
                                    this.setState({ error: err.message })
                              })
                  }

            }

      }
      render() {
            return (
                  <Fragment>
                        <h2>Your review for <strong>{this.props.location.state?.name ? this.props.location.state?.name : "website"}</strong></h2>
                        {this.state.error && <p className="error_message" style={{color:"red"}}>{this.state.error}</p>}
                        <form onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                    <label className='label' htmlFor="review">Write your reviews:</label>
                                    <textarea
                                          id="review"
                                          rows="5"
                                          type="text"
                                          name="review"
                                          value={this.state.review}
                                          onChange={this.handleChange}
                                          className="margin-bottom"
                                    />
                              </div>

                              <Rating addStarRating={this.addStarRating} />
                              <button className="btn btn-action-2">Add Review</button>
                        </form>
                        {this.state.displayMessage &&
                              <PopUp
                                    message="Successfully added a review"
                                    btnOne="Back"
                                    btnTwo="Home"
                                    handleBtnOne={() => this.props.history.goBack()}
                                    handleBtnTwo={() => this.props.history.push("/")}
                              />
                        }
                  </Fragment>
            )
      }
}
export default withRouter(AddReview);