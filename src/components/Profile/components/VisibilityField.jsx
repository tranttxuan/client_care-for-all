import React, { Component, Fragment } from 'react'

export default class VisibilityField extends Component {
      state = {
            public: true,
      }
      handleChange = (event) => {
            this.setState({ public: event.target.value });
            this.props.handleVisibility(event.target.value);
            console.log(event.target.value)
      }
      componentDidMount() {
            this.setState({ public: this.props.defaultValue })
      }
      render() {
            "test"
            return (
                  <Fragment>
                        <label htmlFor="public">Everyone</label>
                        <input
                              type="radio"
                              id="public"
                              name="public"
                              value="true"
                              onChange={this.handleChange}
                              checked={this.state.public === "true" ? true : false}
                        />
                        <label htmlFor="private">Private</label>
                        <input
                              type="radio"
                              id="private"
                              name="public"
                              value="false"
                              onChange={this.handleChange}
                              checked={this.state.public === "true" ? false : true}

                        />

                  </Fragment>
            )
      }
}
