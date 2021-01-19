import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import apiHandler from '../../api/apiHandler'

export default class AnnouncementList extends Component {

      state = {
            list: []
      }
      getData = () => {
            apiHandler
                  .getAnnouncementsByAuthor(this.props.idUser)
                  .then(data => {
                        this.setState({ list: data })
                  })
                  .catch(err => console.log(err))
      }
      componentDidMount() {
            this.getData();
      }
      handleDelete = (id) => {
            apiHandler.deleteOneAnnouncement(id)
                  .then(response => this.getData())
                  .catch(err => console.log(err))
      }
      render() {
            
            return (
                  <table style={{ backgroundColor: "pink" }}>
                        <thead>
                              <tr>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Applicants</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                              </tr>

                        </thead>

                        <tbody>
                              {this.state.list.map((ann, id) => {
                                    return (
                                          <tr key={id}>
                                                <td>{ann.createdAt.toString().substr(0, 10)}</td>
                                                <td>{ann.title}</td>
                                                <td>
                                                      <ul>
                                                            {ann.applicants.map(((applicant, idApp) => {
                                                                  return (
                                                                        <li key={idApp}><NavLink to={`/provider/${applicant._id}`}>{applicant.lastName}</NavLink></li>
                                                                  )
                                                            }))
                                                            }
                                                      </ul>
                                                </td>
                                                <td><NavLink to={`/announcements/edit/${ann._id}`}><i className="fas fa-edit"></i></NavLink></td>
                                                <td><button onClick={e => this.handleDelete(ann._id)}><i className="fas fa-trash-alt"></i></button></td>
                                          </tr>
                                    )
                              }
                              )}
                              {this.state.list.length === 0 && <tr key={0}><th colSpan="5">Empty list</th></tr>}

                        </tbody>
                  </table>
            )
      }
}
