import React, { Component } from 'react'
import Banner from '../components/Home/Banner'
import Instructions from '../components/Home/Instructions'
import WebReview from '../components/Home/WebReview'



export default class Home extends Component {
      state = {

      }

      handleServices = (name, value) => {
            console.log(name, value)
      }
      render() {
            return (
                  <div>
                        <Banner />
                        <Instructions />
                        <WebReview />
                        
                  </div>
            )
      }
}
