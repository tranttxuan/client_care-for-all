import React, { Component } from 'react'

export default class AnnouncementList extends Component {
      state = {
            list: []
      }
      componentDidMount(){
            //get information here
      }
      render() {
            return (
                  <table>
                        <thead>
                              <th>Date</th>
                              <th>Title</th>
                              <th>Description</th>
                              <th>Edit</th>
                              <th>Delete</th>
                        </thead>

                        <tbody>
                              {/* map */}
                        </tbody>
                  </table>
            )
      }
}
