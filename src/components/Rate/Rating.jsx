import React, { Component, Fragment } from 'react'
import Star from './Star';
import "../../styles/Review.css"
import { withRouter } from 'react-router-dom';

class Rating extends Component {
      state = {
            stars: [1, 2, 3, 4, 5],
            hoverRating: 0,
            rating: 0,
            inReviewCard: false,
      }
      componentDidMount() {
            //use for provider's page
            if (this.props.match.path.split("/")[this.props.match.path.split("/").length - 1] !== "review") {
                  this.setState({ rating: this.props.rate, inReviewCard: true })
            }

      }
      onClick = (index) => {
            if (!this.state.inReviewCard) {
                  this.setState({ rating: index });
                  this.props.addStarRating(index)
            }
      }
      render() {
            const { stars, rating, inReviewCard } = this.state;
            const rateInCard = [];
            for (let i = 1; i < rating + 1; i++) {
                  rateInCard.push(i)
            }
            return (
                  <Fragment>
                        {!inReviewCard && <h3>Star Rating</h3>}
                        <div style={{ display: 'flex' }}>
                              {(inReviewCard ? rateInCard : stars)
                                    .map((star, index) => {
                                          return (
                                                <Star
                                                      key={index}
                                                      startId={index}
                                                      rating={rating}
                                                      onClick={() => this.onClick(index)}
                                                />
                                          )
                                    })}
                        </div>

                  </Fragment>
            )
      }
}
export default withRouter(Rating);