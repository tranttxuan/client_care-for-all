import React from 'react';
import { NavLink } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import withUser from "../Auth/withUser"
import "../../styles/NavMain.css";

function NavMain(props) {
      const { context } = props;

      const handleLogout = () => {
            context.removeUser();
      }
      return (


            <nav>
                  <NavLink exact to="/">HOME</NavLink>

                  <ul>
                        {context.isLoggedIn && (
                              <React.Fragment>
                                    <li>
                                          <NavLink to="/">Message???</NavLink>
                                    </li>
                                    <li className="container-icon">
                                          <p className="icon">Icon-YOU</p>
                                          <ul className="after-icon">
                                                <li>Hello <strong>{context.user.firstName}</strong></li>
                                                <li> <NavLink to="/profile">Your profile</NavLink></li>
                                                <li onClick={handleLogout}>Log out</li>
                                          </ul>
                                    </li>


                              </React.Fragment>
                        )}

                        {!context.isLoggedIn&& (
                              <React.Fragment>
                                    <li><NavLink to="/signup">Sign up</NavLink> </li>
                                    <li><NavLink to="/login">Log in</NavLink></li>
                              </React.Fragment>
                        )}


                  </ul>

            </nav>
      )
}

export default withUser(NavMain);
