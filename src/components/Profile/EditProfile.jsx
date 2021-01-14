import React, { Component } from 'react'
import { buildFormData } from '../../utils';
import UserContext from '../Auth/UserContext'
import UploadWidget from '../UploadWidget';


export default class EditProfile extends Component {
      static contextType = UserContext;

      state = {
            user: null,
            image: '',
      }

      imageRef = React.createRef();

      componentDidMount() {
            this.setState({ user: this.context.user })
      }

      handleChange = (event) => {
            const { name, value } = event.target;
            this.setState({ user: { ...this.state.user, [name]: value } })
      }

      handleFileSelect = (tempUrl) => {
            console.log("------------------", tempUrl)
            this.setState({ image: tempUrl })
      }
      handleSubmit = (event) => {
            event.preventDefault();
            console.log(event.target)
      }

      render() {

            // console.log("lala", this.state?.user?.lastName)
            return (
                  this.state.user ?
                        <div>
                              <h1>Edit your profile</h1>

                              <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: "column" }}>
                                    <div className="block">
                                          <img src={this.state.image || this.context.user.image} alt={this.state.user.firstName} />
                                    </div>
                                    <div className="form-group">
                                          <UploadWidget
                                                onFileSelect={this.handleFileSelect}
                                                name="image"
                                                ref={this.imageRef}
                                          >
                                                Upload image
                                          </UploadWidget>
                                    </div>


                                    <div className="block">
                                          <div className="form-group">
                                                <label className='label' htmlFor="firstName">First Name</label>
                                                <input
                                                      id="firstName"
                                                      type="text"
                                                      name="firstName"
                                                      value={this.state.user.firstName}
                                                      onChange={this.handleChange}
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="lastName">Last name</label>
                                                <input
                                                      id="lastName"
                                                      type="text"
                                                      name="lastName"
                                                      value={this.state.user.lastName}
                                                      onChange={this.handleChange}

                                                />
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="email">Email</label>
                                                <input
                                                      id="email"
                                                      type="text"
                                                      name="email"
                                                      value={this.state.user.email}
                                                      onChange={this.handleChange}
                                                />
                                          </div>

                                          <div className="form-group">
                                                <label className='label' htmlFor="password">Password</label>
                                                <input
                                                      id="password"
                                                      type="password"
                                                      name="password"
                                                      value={this.state.user.password}
                                                      onChange={this.handleChange}
                                                      placeholder="*********"
                                                />
                                          </div>


                                          <div className="form-group">
                                                <label className='label' htmlFor="birthday">Birthday</label>
                                                <input
                                                      id="birthday"
                                                      type="date"
                                                      name="birthday"
                                                      value={this.state.birthday}
                                                      placeholder={this.state.birthday}
                                                      onChange={this.handleChange}
                                                      max={new Date()}
                                                />

                                          </div>

                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div className="block">
                                          <div className="form-group">
                                                <label className='label' htmlFor="description">Description</label>
                                                <textarea
                                                      rows="10"
                                                      id="description"
                                                      type="text"
                                                      name="description"
                                                      value={this.state.user.description}
                                                      onChange={this.handleChange}
                                                />
                                          </div>
                                    </div>


                                    <button>Edit</button>
                              </form>
                        </div>
                        : <h1>Loading ...</h1>
            )

      }
}
