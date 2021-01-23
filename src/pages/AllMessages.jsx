import React, { Component } from 'react'
import MessageTable from '../components/Message/MessageTable'
import "../styles/FormMessage.css"

export default class AllMessages extends Component {
      render() {
            return (
                  <div className="all-message">
                        <div>
                              <MessageTable />
                        </div>
                  </div>
            )
      }
}
