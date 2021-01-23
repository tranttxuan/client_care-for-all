import React, { Component } from 'react'
import FormSignup from '../components/FormsAuth/FormSignup'

export default class Signup extends Component {
      render() {
            return (
                  <div className="block block--center login auth">
                        <FormSignup />
                  </div>
            )
      }
}
