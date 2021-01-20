import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext'

export default class Messages extends Component {
      static contextType = UserContext;
      state = {
            list: null,
            error: '',
            message: ''

      }
      componentDidMount() {
            apiHandler.getThread(this.props.match.params.idMessage)
                  .then(data => {
                        console.log(data)
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
            console.log(this.state.message)
            apiHandler
                  .addNewMessage(this.props.match.params.idMessage, {message:this.state.message, author: this.context.user._id})
                  .then(response => {
                        this.setState({list:response})
                  })
                  .catch(err => this.setState({error: err.message}))

      }
      render() {
            if (!this.state.list) return <div>....Loading</div>

            const { sender, receiver, announcement, messagesBox } = this.state.list;
            console.log(messagesBox)
            return (
                  <div>
                        {announcement && <h3>Announcement: <strong>{announcement.title}</strong></h3>}

                        <div>
                              <h3>Chat thread between {sender._id === this.context.user._id
                                    ? <span>{receiver.firstName}</span>
                                    : <span>{sender.firstName}</span>} and you</h3>
                        </div>

                        <div>

                              {
                                    messagesBox.map(({ author, message }, id) => (
                                          author === this.context.user._id
                                                ? <div key={id} className="right">
                                                      <img
                                                            src={this.context.user.image}
                                                            alt={this.context.user.firstName} />
                                                      <p>{message}</p>
                                                </div>
                                                : <div key={id} className="left">
                                                      <img
                                                            src={author === sender._id ? sender.image : receiver.image}
                                                            alt={author === sender._id ? sender.firstName : receiver.firstName} />
                                                      <p>{message}</p>
                                                </div>
                                    ))
                              }
                        </div>
                        <div>
                              <form onSubmit={this.onSubmit}>
                                    <input
                                          onChange={this.onChange}
                                          value={this.state.message}
                                          name="message"
                                    />
                                    <button>Send</button>
                              </form>
                              {this.state.error && <p>{this.state.error}</p>}
                        </div>

                  </div>

            )
      }
}
