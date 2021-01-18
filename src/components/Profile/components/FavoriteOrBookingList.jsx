import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import apiHandler from '../../../api/apiHandler'

export default class FavoriteOrBookingList extends Component {
      state = {
            list: this.props.list,
            isFavList: this.props.isFavList,

      }
      // componentDidMount(){
      //       this.setState({
      //             list:this.props.list.setState,
      //              isFavList: this.props.isFavList,
      //       })
      // }

      handleDelete = (idUser) => {
            if (this.setState.isFavList) {
                  apiHandler.takeOffFavoriteList(idUser)
                        .then(response => {
                              console.log(response)
                              window.location.reload();
                        })
                        .catch(err => { console.log(err.message) })
            } else {
                  apiHandler.cancelBookingRequest(idUser)
                        .then(response => {
                              console.log(response)
                              window.location.reload();
                        })
                        .catch(err => { console.log(err.message) })
            }

      }
      render() {
            console.log(this.state.isFavList,"fav")
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

                                          <td >
                                                <NavLink 
                                                to={this.state.isFavList ? `/provider/${provider._id}` : "/"}><img src={provider.image} /></NavLink>
                                          </td>
                                          {this.state.isFavList
                                                ? <td><NavLink to={`/provider/${provider._id}`}> {provider.firstName} {provider.lastName}</NavLink></td>
                                                : <td> {provider.firstName} {provider.lastName}</td>
                                          }

                                         
                                          <td><button onClick={e => this.handleDelete(provider._id)}><i className="fas fa-trash-alt"></i></button></td>
                                          <td>Message <i className="fas fa-envelope"></i></td>

                                    </tr>
                              ))}
                              {/* {this.state.isFavList ?<p>AAAA</p> :<p>PPPP</p>} */}
                        </tbody>
                  </table>

            )
      }
}
