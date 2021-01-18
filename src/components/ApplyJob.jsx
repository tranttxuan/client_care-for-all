import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler'

export default class ApplyJob extends Component {
      state = {
            applied: false,
      }
      handleApply = () => {
            apiHandler.applyForJob(this.props.id)
                  .then(response => console.log(response))
                  .catch(err => console.log(err))
      }
      render() {
            return (
                  <Fragment >
                        <button onClick={this.handleApply}>
                              <p>{this.state.applied ? "Applied" : "Apply now!"}</p>
                        </button>
                  </Fragment>
            )
      }
}
