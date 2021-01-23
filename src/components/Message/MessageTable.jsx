import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import apiHandler from '../../api/apiHandler'
import UserContext from '../Auth/UserContext'



export default class MessageTable extends Component {
      static contextType = UserContext;
      state = {
            list: [],
            inSentBox: false,
            error: '',


      }
      componentDidMount() {
            this.setState({ inSentBox: false })
            apiHandler.getMessages(this.context.user._id, "received")
                  .then(list => this.setState({ list: list }))
                  .catch(err => this.setState({ error: err.message }))
      }
      GotoReceivedBox = () => {
            this.setState({ inSentBox: false })
            console.log("here received box")
            apiHandler.getMessages(this.context.user._id, "received")
                  .then(list => this.setState({ list: list }))
                  .catch(err => this.setState({ error: err.message }))
      }
      GoToSentBox = () => {
            this.setState({ inSentBox: true })
            apiHandler.getMessages(this.context.user._id, "sent")
                  .then(list => this.setState({ list: list }))
                  .catch(err => this.setState({ error: err.message }))
      }
      render() {
            const { error, list, inSentBox } = this.state;
            
            return (
                  <div className="table block">
                        <div>
                              <button onClick={this.GotoReceivedBox}  className="btn">Received</button>
                              <button onClick={this.GoToSentBox} className="btn">Sent</button>
                        </div>
                        {error && <p  className="error-message">error</p>}
                        <br></br>
                        <hr></hr>
                        <div className="table-container">
                              <table>
                                    <thead>
                                          <tr>
                                                <th>From: {!inSentBox ? "other" : "you"} </th>
                                                <th>To : {!inSentBox ? "you" : "other"}</th>
                                                <th>Title</th>
                                                <th>Chat thread</th>
                                          </tr>
                                    </thead>

                                    <tbody>
                                          {list.map(({ sender, receiver, _id, announcement }, id) => (
                                                <tr key={id}>
                                                      <td>From:{!inSentBox ? <p>{sender.lastName} {sender.firstName}</p> : "you"} </td>
                                                      <td>TO: {!inSentBox ? "you" : <p>{receiver.lastName} {receiver.firstName}</p>}</td>
                                                      <td>
                                                            <NavLink to={`/message/${_id}`}>
                                                                  {announcement ? <p>{announcement.title.substring(0, 50)}</p> : "request"}
                                                            </NavLink>

                                                      </td>
                                                      <td>
                                                            <NavLink to={`/message/${_id}`}>
                                                                  <i className="fas fa-comments"></i>
                                                            </NavLink>

                                                      </td>
                                                </tr>
                                          ))}

                                          {list.length === 0 && <tr>
                                                <td colSpan="4"> No Message</td>
                                          </tr>}
                                    </tbody>
                              </table>
                        </div>

                  </div>
            )
      }
}
