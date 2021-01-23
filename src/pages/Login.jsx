import React, { Component } from 'react'
import FormLogin from '../components/FormsAuth/FormLogin'
import "../styles/Auth.css"

export default class Login extends Component {
      render() {
            return (
                  <div className="block block--center auth">
                        <FormLogin />
                  </div>
            )
      }
}
