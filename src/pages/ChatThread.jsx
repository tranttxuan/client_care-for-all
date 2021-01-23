import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';
import "../styles/ChatThread.css"

export default class ChatThread extends Component {
      static contextType = UserContext;
      state = {
            list: null,
            error: '',
            message: ''

      }
      componentDidMount() {
            apiHandler.getThread(this.props.match.params.idMessage)
                  .then(data => {
                        this.setState({ list: data })
                  })
                  .catch(error => this.setState({ error: error }))

      }
      onChange = (event) => {
            this.setState({ message: event.target.value });
      }
      onSubmit = (event) => {
            event.preventDefault();
            if (this.state.message === "") {
                  return this.setState({ error: "Please write something....." });
            }

            apiHandler
                  .addNewMessage(this.props.match.params.idMessage, { message: this.state.message, author: this.context.user._id })
                  .then(response => {
                        this.setState({ list: response, message:'' })
                        
                  })
                  .catch(err => this.setState({ error: err.message }))

      }
      render() {
            if (!this.state.list) return <div>....Loading</div>

            const { sender, receiver, announcement, messagesBox } = this.state.list;
            // console.log(messagesBox)
            return (
                  <div>
                        {announcement && <h3 className="margin-bottom">Announcement: <strong>{announcement.title}</strong></h3>}

                        <div className=" margin-top margin-bottom">
                              <h2>Chat thread between {sender._id === this.context.user._id
                                    ? <span>{receiver.firstName}</span>
                                    : <span>{sender.firstName}</span>} and you</h2>
                        </div>

                        <div className="chatThread flex-column">

                              {
                                    messagesBox.map(({ author, message }, id) => (
                                          author === this.context.user._id
                                                ? <div key={id} className="right flex-row">
                                                      <p>{message}</p>
                                                      <img
                                                            src={this.context.user.image}
                                                            alt={this.context.user.firstName} />

                                                </div>
                                                : <div key={id} className="left flex-row">

                                                      <img
                                                            src={author === sender._id ? sender.image : receiver.image}
                                                            alt={author === sender._id ? sender.firstName : receiver.firstName} />
                                                      <p>{message}</p>
                                                </div>
                                    ))
                              }
                        </div>
                        <div className="chatThread__add">
                              <form onSubmit={this.onSubmit}>
                                    <input
                                          onChange={this.onChange}
                                          value={this.state.message}
                                          name="message"
                                    />
                                    <button className="btn btn-action">Send</button>
                              </form>
                              {this.state.error && <p>{this.state.error}</p>}
                        </div>

                  </div>

            )
      }
}
