import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler'
import UserContext from './UserContext';

export default class UserProvider extends Component {
      state = {
            user: null,
            isLoggedIn: false,
            isLoading: true,
      }

      componentDidMount() {
            apiHandler
                  .isLoggedIn()
                  .then(data => {
                        this.setState({ user: data, isLoggedIn: true, isLoading: false })
                  })
                  .catch(error => this.setState({ isLoading: false }))
      }

      removeUser = () => {
            apiHandler.logout()
                  .then(() => {
                        this.setState({ user: null, isLoggedIn: false, isLoading: true });
                        setTimeout(() => {
                              this.setState({ isLoading: false });
                        }, 5000);
                  })
                  .catch(err => console.log(err))
      }

      setUser = (userInfo) => {
            this.setState({ user: userInfo, isLoggedIn: true, isLoading: false })
      }

      render() {
            const contextValue = {
                  user: this.state.user,
                  isLoggedIn: this.state.isLoggedIn,
                  isLoading: this.state.isLoading,
                  removeUser: this.removeUser,
                  setUser: this.setUser,
            }
            return (
                  <div>
                        <UserContext.Provider value={contextValue}>
                              {this.props.children}
                        </UserContext.Provider>
                  </div>
            )
      }
}
