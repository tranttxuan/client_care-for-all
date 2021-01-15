import React, { Component, Fragment } from 'react'

export default class VisibilityField extends Component {
      state = {
            isProvider: "",
      }
      handleChange = (event) => {
           const {name, value} = event.target;
           console.log({name},{value})
           if(value === "public"){
                 console.log("vo day")
            this.setState({ isProvider: true });
            this.props.handleVisibility(true);
           }else{
            this.setState({ isProvider: false });
            this.props.handleVisibility(false);
           }
          
      }
      componentDidMount() {
            this.setState({ isProvider: this.props.defaultValue })
      }
      render() {
            "test"
            return (
                  <Fragment>
                        <label htmlFor="public">Everyone</label>
                        <input
                              type="radio"
                              id="public"
                              name="isProvider"
                              value="public"
                              onChange={this.handleChange}
                              checked={this.state.isProvider}
                        />


                        <label htmlFor="private">Private</label>
                        <input
                              type="radio"
                              id="private"
                              value="private"
                              name="isProvider"
                              onChange={this.handleChange}
                              checked={!this.state.isProvider}
                        />

                  </Fragment>
            )
      }
}
