import React, { Component } from 'react'
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext'

export default class Messages extends Component {
      static contextType = UserContext;
      state = {
            list: null,
            error: ''

      }
      componentDidMount() {
            apiHandler.getThread(this.props.match.params.idMessage)
                  .then(data => {
                        console.log(data)
                        this.setState({ list: data })
                  })
                  .catch(error => this.setState({ error: error }))

      }
      render() {
            if (!this.state.list) return <div>....Loading</div>
            const { sender, receiver, announcement, messagesBox } = this.state.list;
            return (
                  <div>
                        {announcement && <h3>Announcement: <strong>{announcement.title}</strong></h3>}

                        <div>
                              <h3>Chat thread between {sender._id === this.context.user._id
                                    ? <span>{receiver.firstName}</span>
                                    : <span>{sender.firstName}</span>} and you</h3>
                        </div>

                        <div>

                        </div>
                  </div>

            )
      }
}
