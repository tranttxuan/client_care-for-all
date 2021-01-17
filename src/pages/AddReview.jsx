import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler';
import PopUp from '../components/PopUp';
import Rating from '../components/AddReview/Rating';
import { withRouter } from 'react-router-dom';

class AddReview extends Component {
      state = {
            review: '',
            rating: '',
            error: '',
            displayMessage: false
      }
      handleChange = (event) => {
            this.setState({ [event.target.name]: event.target.value });
      }
      addStarRating = (rating) => {
            this.setState({ rating: rating + 1 })
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
            }

      }
      render() {
            return (
                  <Fragment>
                        <h2>Your review for <strong>{this.props.location.state.name}</strong></h2>
                        {this.state.error && <p>{this.state.error}</p>}
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
                                    />
                              </div>
                              <Rating addStarRating={this.addStarRating} />
                              <button>Add Review</button>
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