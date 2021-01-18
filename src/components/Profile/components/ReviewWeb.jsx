import React, { Component, Fragment } from 'react'
import PopUp from '../../PopUp';
import { withRouter } from 'react-router-dom';
import apiHandler from '../../../api/apiHandler';
import Star from '../../Rate/Star';
import Rating from '../../Rate/Rating';

class ReviewWeb extends Component {
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
                  console.log("data", data)
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
      render() {
            return (
                  <Fragment>

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
export default withRouter(ReviewWeb);