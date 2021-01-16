import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

class OneProvider extends Component {
      state = {
            isFavorite: false,
            error: ''
      }
      handleBack = () => {
            this.props.history.goBack();
      }

      addToFavorite = () => {
            this.setState({ isFavorite: !this.state.isFavorite });
            const idProvider = this.props.match.params.idProvider;
           
            if (!this.state.isFavorite === true) {
                  apiHandler
                        .addToFavoriteList(idProvider)
                        .then(response => {console.log(response) })
                        .catch(err => {
                              console.log(err.message)
                              this.setState({ error: err.message, isFavorite:false })
                        })
            } else {
                  apiHandler.takeOffFavoriteList(idProvider)
                  .then(response => {
                      console.log(response)
                  })
                  .catch(err => {
                        console.log(err.message)
                        // this.setState({ error: err.message })
                  })
            }
      }
      render() {
            const { isFavorite } = this.state;

            return (
                  <div>
                        <div>
                              <button onClick={this.handleBack}><p><i className="fas fa-arrow-circle-left" /></p> Back</button>
                              <NavLink to={`/provider/${this.props.match.params.idProvider}/review`}>Add Review</NavLink>
                              <button onClick={this.addToFavorite}>
                                    {isFavorite
                                          ? <i className="fas fa-heart" style={{ color: "red" }} />
                                          : <i className="far fa-heart solid" />}
                              </button>
                        </div>


                  </div>
            )
      }
}

export default withRouter(OneProvider);