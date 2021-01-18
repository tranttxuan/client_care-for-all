import React, { Component, Fragment } from 'react'
import apiHandler from '../api/apiHandler';
import UserContext from './Auth/UserContext';

export default class ButtonAddFavoriteList extends Component {
      static contextType = UserContext;
      state = {
            isFavorite:false
      }
      componentDidMount() {
            if (this.props.isAdded) {
                  console.log("check-----is in list")
                  this.setState({ isFavorite: true })
            }
      }
      addToFavorite = () => {
            this.setState({ isFavorite: !this.state.isFavorite });
            // const idProvider = this.props.match.params.idProvider;
            const idProvider = this.props.idProvider

            // const data = this.context.user;


            if (!this.state.isFavorite === true) {
                  apiHandler
                        .addToFavoriteList(idProvider)
                        .then(response => {
                              console.log(response)
                              // data.favoriteProviders.push(idProvider);
                              // this.context.setUser(data);
                        })
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
