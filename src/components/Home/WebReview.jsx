import React, { Component } from 'react'
import apiHandler from '../../api/apiHandler';
import ReviewCard from '../ReviewCard';
import "../../styles/Review.css";
import Carousel from '../Carousel';

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
                        <Carousel reviews={this.state.list} />
                  </div>

            )
      }
}


