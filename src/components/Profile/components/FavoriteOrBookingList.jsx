import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import apiHandler from '../../../api/apiHandler'
import FormMessage from '../../Message/FormMessage'

export default class FavoriteOrBookingList extends Component {
      state = {
            list: [],
            isFavList: false,

      }
      componentDidMount() {

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
            // console.log("fav", this.state.isFavList === "true", "list", this.state.list)
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
                                          <td>
                                                {this.state.isFavList === "true" ?
                                                      <NavLink to={`/provider/${provider._id}`}>
                                                            <img src={provider.image} alt={provider.firstName} />
                                                      </NavLink>
                                                      : <img src={provider.image} alt={provider.firstName} />
                                                }

                                          </td>
                                          <td>
                                                {this.state.isFavList === "true" ?
                                                      <NavLink to={`/provider/${provider._id}`}>
                                                            {provider.firstName} {provider.lastName}
                                                      </NavLink>
                                                      : <p> {provider.firstName} {provider.lastName}</p>
                                                }


                                          </td>


                                          <td><button onClick={e => this.handleDelete(provider._id)}><i className="fas fa-trash-alt"></i></button></td>
                                          <td>Message <i className="fas fa-envelope"></i></td>
                                          <td> <FormMessage idReceiver={provider._id} /></td>
                                    </tr>


                              ))}



                        </tbody>
                  </table >

            )
      }
}
