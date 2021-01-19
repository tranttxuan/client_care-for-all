import React, { Component, Fragment } from 'react'

export default class OtherServices extends Component {
      state = {
            houseKeeping: '',
            shoppingAndErrands: "",
            specialNeedsCare: "",
            homeworkAssistance: ""
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
                  const { houseKeeping, shoppingAndErrands, specialNeedsCare, homeworkAssistance } = this.props.defaultValue
                  this.setState({ houseKeeping, shoppingAndErrands, specialNeedsCare, homeworkAssistance })
            }
      }
      render() {
            return (
                  <div>
                        <Fragment>
                              <label className='label' htmlFor="houseKeeping">House Keeping</label>
                              <input
                                    id="houseKeeping"
                                    type="checkbox"
                                    name="houseKeeping"
                                    onChange={this.handleChange}
                                    checked={this.state.houseKeeping}

                              />

                              <label className='label' htmlFor="shoppingAndErrands">Shopping And Errands</label>
                              <input
                                    id="shoppingAndErrands"
                                    type="checkbox"
                                    name="shoppingAndErrands"
                                    onChange={this.handleChange}
                                    checked={this.state.shoppingAndErrands}
                              />

                              <label className='label' htmlFor="specialNeedsCare">Special needs care</label>
                              <input
                                    id="specialNeedsCare"
                                    type="checkbox"
                                    name="specialNeedsCare"
                                    onChange={this.handleChange}
                                    checked={this.state.specialNeedsCare}
                              />

                              <label className='label' htmlFor="homeworkAssistance">Homework Assistance</label>
                              <input
                                    id="homeworkAssistance"
                                    type="checkbox"
                                    name="homeworkAssistance"
                                    onChange={this.handleChange}
                                    checked={this.state.homeworkAssistance}

                              />
                        </Fragment>
                  </div>
            )
      }
}
