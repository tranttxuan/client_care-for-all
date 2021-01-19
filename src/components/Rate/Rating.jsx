import React, { Component } from 'react'
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
            if (this.props.match.path === "/profile") {
                  this.setState({ inReviewCard: false })
            }
            if (this.props.match.path.split("/")[this.props.match.path.split("/").length - 1] !== "review" && this.props.match.path !== "/profile") {
                  this.setState({ rating: this.props.rate, inReviewCard: true })
            }
            console.log("youre here", this.props.match.path)

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
                  <div>
                        {!inReviewCard && <h3>Star Rating</h3>}
                        <div style={{ display: 'flex' }}>

                              {inReviewCard
                                    ? rateInCard.map((star, index) => {
                                          return (
                                                <Star
                                                      key={index}
                                                      startId={index}
                                                      rating={rating}
                                                      onClick={() => this.onClick(index)}
                                                />
                                          )
                                    })
                                    : stars.map((star, index) => {
                                          return (
                                                <Star
                                                      key={index}
                                                      startId={index}
                                                      rating={rating}
                                                      onClick={() => this.onClick(index)}
                                                />
                                          )
                                    })
                              }
                        </div>

                  </div>
            )
      }
}
export default withRouter(Rating);