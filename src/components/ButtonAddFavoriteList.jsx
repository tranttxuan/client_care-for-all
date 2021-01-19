import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler';
import UserContext from './Auth/UserContext';

export default class ButtonAddFavoriteList extends Component {
      static contextType = UserContext;
      state = {
            isFavorite: false,
            message: ''
      }

      addToFavorite = () => {
            this.setState({ isFavorite: !this.state.isFavorite });
            const idProvider = this.props.idProvider;
            if (!this.isFavorited()) {
                  apiHandler
                        .addToFavoriteList(idProvider)
                        .then(response => {
                              if (response.message === "Of course you are in your favorite list!") {
                                    this.setState({ message: "It's you!" })
                                    setTimeout(() => {
                                          this.setState({ message: "" })
                                    }, 5000);
                              } else {
                                    this.context.setUser(response)
                              }

                        })
                        .catch(err => {
                              console.log(err.message)
                              this.setState({ isFavorite: false })
                        })
            } else {
                  apiHandler.takeOffFavoriteList(idProvider)
                        .then(response => {
                              console.log(response)
                              this.context.setUser(response)
                        })
                        .catch(err => { console.log(err.message) })
            }
      }


      isFavorited = () => {
            return this.context.user?.favoriteProviders.includes(this.props.idProvider)
      }


      render() {

            return (
                  <Fragment key={this.props.isAdded}>
                        <button onClick={this.addToFavorite}>
                              {this.isFavorited() ?
                                    <i className="fas fa-heart" style={{ color: "red" }} />
                                    : <i className="far fa-heart solid" />}
                        </button>
                        {this.state.message && <p>{this.state.message}</p>}
                  </Fragment>
            )
      }
}
