import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import apiHandler from '../api/apiHandler'
import UserContext from './Auth/UserContext';

export default class ApplyJob extends Component {
      static contextType = UserContext;
      state = {
            applicants:[],
            error: '',
            submit: ''
      }
      componentDidMount() {
            this.setState({ applicants :  this.props.applicants})

      }
      handleApply = () => {
           
            if (!this.didApply()) {
                 
                  apiHandler.applyForJob(this.props.id)
                        .then(response => {
                              console.log("check", response)
                              this.setState({applicants: response.applicants})
                        })
                        .catch(err => { this.setState({ error: "Sign in to apply this job " }) })
            } else {
                  apiHandler.cancelApplication(this.props.id)
                        .then(response =>  this.setState({applicants: response.applicants}))
                        .catch(err => { this.setState({ error: "Sign in to apply this job " }) })
            }

      }
      didApply = () =>{
            return this.state.applicants?.includes(this.context.user?._id)
      }
      render() {
            return (
                  <Fragment >
                        <button onClick={this.handleApply} style={{ color: this.didApply() && "green" }}>
                              <p>{this.didApply() ? "Applied" : "Apply now!"}</p>
                        </button>
                        {this.state.error && <p>{this.state.error} <NavLink to="/login">Log in</NavLink></p>}

                  </Fragment>
            )
      }
}
