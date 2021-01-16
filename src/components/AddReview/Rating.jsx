import React, { Component, Fragment } from 'react'
import Star from './Star';
import "../../styles/Review.css"

export default class Rating extends Component {
      state = {
            stars: [1, 2, 3, 4, 5],
            hoverRating: 0,
            rating: 0,
      }
      onClick = (index) => {
            console.log("index", index)
            this.setState({ rating: index });
            this.props.addStarRating(index)
      }
      render() {
            const { stars, rating } = this.state;

            return (
                  <Fragment>
                        <h3>Star Rating</h3>
                        <div style={{ display: 'flex' }}>
                              {stars.map((star, index) => {
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
