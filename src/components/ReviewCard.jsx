import React from 'react'
import Rating from './Rate/Rating'

function ReviewCard({ rate, name, review }) {
      return (
            <div className="review-card block">
                  <div>
                        <h3>{name}</h3>
                        <Rating rate={rate} />
                  </div>
                  <p><i class="fas fa-quote-left"></i> {review}</p>
            </div>
      )
}

export default ReviewCard
