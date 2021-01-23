import React, { Component, Fragment } from 'react'
import apiHandler from '../../api/apiHandler';
import UserContext from '../Auth/UserContext';
import { Redirect } from 'react-router-dom';


export default class FormLogin extends Component {
      static contextType = UserContext;

      state = {
            password: 'Tran123',
            email: 'tran@gmail.com',
            errors: {
                  err_password: '',
                  err_email: '',
                  err_submit: ''
            },
      }

      handleChange = (event) => {
            const { value, name } = event.target;
            this.setState({ [name]: value });
      }

      checkValidation = () => {
            const { email, password } = this.state;
            let isValid = true;
            let errors = {};

            if (!email) {
                  errors.err_email = 'This field is required';
                  isValid = false;
            }
            if (!password) {
                  errors.err_password = 'This field is required';
            }
            this.setState({ errors });

            setTimeout(() => {
                  this.setState({ errors: "" });
            }, 3000);
            return isValid;

      }

      handleSubmit = (event) => {
            event.preventDefault();

            if (this.checkValidation()) {
                  const { errors, ...data } = this.state;
                  apiHandler.login(data)
                        .then(data => {
                              this.context.setUser(data);
                        })
                        .catch(err => {
                              this.setState(prevState => ({
                                    errors: { ...prevState.errors, err_submit: err.message }
                              }))
                        })
            }

      }
      render() {
            if (this.context.isLoggedIn) return <Redirect to="/" />;
            // console.log(this.context.isLoading)
            const { email, password, errors } = this.state;
            const { err_email, err_password, err_submit } = errors;

            return (
                  <Fragment>
                        <header>
                              <h1 className="flex-row-center">Login</h1>
                        </header>

                        <form onSubmit={this.handleSubmit} className="flex-column" >
                              <div className="form-group">
                                    <label className='label' htmlFor="email">Email</label>
                                    <input
                                          className={err_email && "failure"}
                                          id="email"
                                          type="text"
                                          name="email"
                                          value={email}
                                          onChange={this.handleChange}
                                    />
                                    {err_email && <p className="error-message">{err_email}</p>}
                              </div>

                              <div className="form-group">
                                    <label className='label' htmlFor="password">Password</label>
                                    <input
                                          className={err_password && "failure"}
                                          id="password"
                                          type="password"
                                          name="password"
                                          value={password}
                                          onChange={this.handleChange}
                                    />
                                    {err_password && <p className="error-message">{err_password}</p>}
                              </div>

                              <button className="btn btn-action btn__auth">Sign in</button>
                              {err_submit && <p className="error-message">{err_submit}</p>}
                        </form>
                  </Fragment>
            )
      }
}
