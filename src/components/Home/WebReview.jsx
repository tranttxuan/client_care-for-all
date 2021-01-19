import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler';
import ReviewCard from '../ReviewCard';

export default class WebReview extends Component {
      state = {
            list: []
      }
      componentDidMount() {
            apiHandler.getWebReview()
                  .then(data => { this.setState({ list: data }) })
                  .catch(err => console.log(err))
      }
      render() {
            return (
                  <div>
                        <div>
                              {this.state.list.map((review, id) =>
                                    <ReviewCard
                                          key={id}
                                          name={review.sender.firstName}
                                          rate={review.rate}
                                          review={review.review}
                                    />
                              )}
                        </div>
                  </div>
            )
      }
}


