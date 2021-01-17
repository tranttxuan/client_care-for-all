import React from 'react'
import Rating from './Rate/Rating'

function ReviewCard({ rate, name, review }) {
      return (
            <div>
                  <div>
                        <h3>{name}</h3>
                        <Rating rate={rate} />
                  </div>
                  <p>{review}</p>
            </div>
      )
}

export default ReviewCard
