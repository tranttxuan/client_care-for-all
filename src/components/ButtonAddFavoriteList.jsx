import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler';

export default class ButtonAddFavoriteList extends Component {
    
      state = {
            isFavorite: false,
      }
      componentDidMount() {
            if (this.props.isAdded) {
                  this.setState({ isFavorite: true })
            }
      }
      addToFavorite = () => {
            this.setState({ isFavorite: !this.state.isFavorite });
            // const idProvider = this.props.match.params.idProvider;
            const idProvider = this.props.idProvider

            if (!this.state.isFavorite === true) {
                  apiHandler
                        .addToFavoriteList(idProvider)
                        .then(response => { console.log(response) })
                        .catch(err => {
                              console.log(err.message)
                              this.setState({ isFavorite: false })
                        })
            } else {
                  apiHandler.takeOffFavoriteList(idProvider)
                        .then(response => {
                              console.log(response)
                        })
                        .catch(err => { console.log(err.message) })
            }
      }
      render() {
            return (
                  <Fragment>
                        <button onClick={this.addToFavorite}>
                              {this.state.isFavorite
                                    ? <i className="fas fa-heart" style={{ color: "red" }} />
                                    : <i className="far fa-heart solid" />}
                        </button>
                  </Fragment>
            )
      }
}
