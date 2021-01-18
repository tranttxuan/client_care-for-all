import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import apiHandler from '../../../api/apiHandler'

export default class FavoriteOrBookingList extends Component {
      state = {
            // list: null,
            // isFavList: false,
            list: [],
            isFavList: false,

      }
      componentDidMount() {
            console.log("favoriteList")
            this.setState({
                  list: this.props.list,
                  isFavList: this.props.isFavList,
            })
      }

      handleDelete = (idUser) => {

            if (this.state.isFavList === "true") {
                  apiHandler
                        .takeOffFavoriteList(idUser)
                        .then(response => {
                              this.setState({ list: this.state.list.filter(e => e._id !== idUser) })

                        })
                        .catch(err => { console.log(err.message) })
            }
            if (this.state.isFavList === "false") {

                  apiHandler
                        .deleteBookingByCurrentUser(idUser)
                        .then(response => {
                              this.setState({ list: this.state.list.filter(e => e._id !== idUser) })
                        })
                        .catch(err => { console.log(err.message) })
            }

      }
      render() {
            console.log("fav", this.state.isFavList === "true", "list", this.state.list)
            return (
                  <table style={{ backgroundColor: "pink" }}>
                        <thead>
                              <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Delete</th>
                                    <th>Contact</th>
                              </tr>

                        </thead>

                        <tbody>

                              {this.state.list.map((provider, i) => (
                                    <tr key={i}>
                                          {this.state.isFavList === "true"
                                                ? (

                                                      <NavLink
                                                            to={this.state.isFavList === "true" && `/provider/${provider._id}`}>
                                                            <td>  <img src={provider.image} /></td>
                                                            <td> {provider.firstName} {provider.lastName}</td>
                                                      </NavLink>

                                                )
                                                : (
                                                      <Fragment>
                                                            <td>  <img src={provider.image} /></td>
                                                            <td> {provider.firstName} {provider.lastName}</td>
                                                      </Fragment>

                                                )
                                          }

                                          <td><button onClick={e => this.handleDelete(provider._id)}><i className="fas fa-trash-alt"></i></button></td>
                                          <td>Message <i className="fas fa-envelope"></i></td>

                                    </tr>
                              ))}



                        </tbody>
                  </table >

            )
      }
}
