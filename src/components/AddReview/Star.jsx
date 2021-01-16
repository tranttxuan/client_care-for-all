import React from 'react'

function Star({ rating, startId, onClick }) {
      let styleClass = 'star-rating-blank';
      if (rating && rating >= startId) {
            styleClass = 'star-rating-filled'
      }
      return (
            <div onClick={onClick} >
                  <svg height="30px"
                        width="33px"
                        className={styleClass}
                        viewBox="0 0 25 23"
                        data-rating="1">
                        <polygon
                              strokeWidth="0"
                              points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                        />
                  </svg>
            </div>

      )
}

export default Star
