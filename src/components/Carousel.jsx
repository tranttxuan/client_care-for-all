import React, { Component } from 'react'
import ReviewCard from './ReviewCard';
import "../styles/Carousel.css"

export default class Carousel extends Component {
      state = {
            activeIndex: 0
      }

      goToSlide = (index) => {
            this.setState({ activeIndex: index });
      }
  
      goToPrevSlide = (e) => {
            e.preventDefault();

            let index = this.state.activeIndex;
            let slidesLength = this.props.reviews.length;

            if (index < 1) {
                  index = slidesLength;
            }
            --index;

            this.setState({
                  activeIndex: index
            });
      }

      goToNextSlide = (e) => {
            e.preventDefault();

            let index = this.state.activeIndex;
            let slidesLength = this.props.reviews.length - 1;

            if (index === slidesLength) {
                  index = -1;
            }
            ++index;

            this.setState({ activeIndex: index });
      }
      

      render() {
            return (
                  <div className="carousel">
                        <button
                              
                              className="carousel__arrow carousel__arrow--left"
                              onClick={e => this.goToPrevSlide(e)}
                        >
                              <i className="fas fa-angle-left"></i>
                        </button>

                        <ul className="carousel__slides">
                              {this.props.reviews.map((review, index) =>
                                    <li
                                          className={
                                                index === this.state.activeIndex
                                                      ? "carousel__slide carousel__slide--active"
                                                      : "carousel__slide"
                                          }
                                          key={index}
                                    >

                                          <ReviewCard
                                                className="carousel-slide__content"
                                                key={index}
                                                review={review.review}
                                                name={review.sender.firstName}
                                                rate={review.rate}
                                          />

                                    </li>
                              )}
                        </ul>

                        <button
                              className="carousel__arrow carousel__arrow--right"
                              onClick={e => this.goToNextSlide(e)}
                        >
                              <i className="fas fa-angle-right"></i>
                        </button>

                        <ul className="carousel__indicators">
                              {this.props.reviews.map((slide, index) =>
                                    <li key={index}>
                                          <button
                                                className={
                                                      index === this.state.activeIndex
                                                            ? "carousel__indicator carousel__indicator--active"
                                                            : "carousel__indicator"
                                                }
                                                onClick={e => this.goToSlide(index)}
                                          />
                                    </li>
                              )}
                        </ul>
                  </div>


            )
      }
}
