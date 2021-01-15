import React, { Component, Fragment } from 'react'

export default class Services extends Component {
      state = {
            childCare: false,
            seniorCare: false,
            petCare: false
      }
      handleChange = (event) => {
            const { name, checked } = event.target
            this.setState({ [name]: checked })
            this.props.handleServices(name, checked);
      }
      componentDidMount() {
            if (this.props.defaultValue) {
                  const { childCare, seniorCare, petCare } = this.props.defaultValue
                  this.setState({ childCare:childCare, seniorCare:seniorCare, petCare:petCare })
            }
      }
      render() {
            return (
                  <Fragment>
                        <label className='label' htmlFor="childCare">Child care</label>
                        <input
                              id="childCare"
                              type="checkbox"
                              name="childCare"
                              onChange={this.handleChange}
                              checked={this.state.childCare}
                        />

                        <label className='label' htmlFor="seniorCare">Senior care</label>
                        <input
                              id="seniorCare"
                              type="checkbox"
                              name="seniorCare"
                              onChange={this.handleChange}
                              checked={this.state.seniorCare}
                        />

                        <label className='label' htmlFor="petCare">Pet care</label>
                        <input
                              id="petCare"
                              type="checkbox"
                              name="petCare"
                              onChange={this.handleChange}
                              checked={this.state.petCare}
                        />
                  </Fragment>
            )
      }
}
