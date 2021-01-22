import React, { Component } from 'react'

export default class Services extends Component {
      state = {
            childCare: "",
            seniorCare: "",
            petCare: ""
      }
      handleChange = (event) => {
            const { name, checked } = event.target
            if (this.props.editable === "false") {
                  this.setState({ [name]: this.state.[name] })
            } else {
                  this.setState({ [name]: checked })
                  this.props.handleServices(name, checked);
            }

      }
      componentDidMount() {
            if (this.props.defaultValue) {
                  const { childCare, seniorCare, petCare } = this.props.defaultValue
                  this.setState({ childCare: childCare, seniorCare: seniorCare, petCare: petCare })
            }
      }
      render() {
            // console.log(this.state)
            return (
                  <div>

                        <input
                              id="childCare"
                              type="checkbox"
                              name="childCare"
                              onChange={this.handleChange}
                              checked={this.state.childCare}
                        />
                        <label className='label' htmlFor="childCare">Child care</label>


                        <input
                              id="seniorCare"
                              type="checkbox"
                              name="seniorCare"
                              onChange={this.handleChange}
                              checked={this.state.seniorCare}
                        />
                        <label className='label' htmlFor="seniorCare">Senior care</label>

                        <input
                              id="petCare"
                              type="checkbox"
                              name="petCare"
                              onChange={this.handleChange}
                              checked={this.state.petCare}
                        />
                        <label className='label' htmlFor="petCare">Pet care</label>
                  </div>
            )
      }
}
