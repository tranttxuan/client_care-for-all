import React, { Component, Fragment } from 'react'

export default class BirthdayFields extends Component {
      state = {
            day: '',
            month: '',
            year: '',
      }
      handleChange = (event) => {
            const { name, value } = event.target;
            this.setState({ [name]: value });
            this.props.handleBirthday({ ...this.state, [name]: value })
      }

      componentDidMount() {
            if (this.props.birthdayValue) {
                  const date = this.props.birthdayValue.split("-");
                  this.setState({
                        day: date[2],
                        month: date[1],
                        year: date[0]
                  }
                  )
            }
      }
      render() {

            return (
                  <Fragment>

                        <input
                              id="year"
                              type="text"
                              name="year"
                              placeholder="yyyy"
                              value={this.state.year}
                              onChange={this.handleChange}
                              required
                        />
                        <input
                              id="month"
                              type="text"
                              name="month"
                              placeholder="mm"
                              value={this.state.month}
                              onChange={this.handleChange}
                              required
                        />
                        <input
                              id="day"
                              type="text"
                              name="day"
                              placeholder="dd"
                              value={this.state.day}
                              onChange={this.handleChange}
                              required
                        />
                  </Fragment>
            )
      }
}
