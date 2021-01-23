import React from 'react';
import { NavLink } from 'react-router-dom';
import withUser from "../Auth/withUser"
import "../../styles/Home/NavMain.css";

function NavMain(props) {
      const { context } = props;

      const handleLogout = () => {
            context.removeUser();
      }
      return (
            <nav className="flex-row">
                  <NavLink exact to="/"><i className="fas fa-hands"></i><span>Care For All</span></NavLink>
                  <ul className="flex-row">
                        {context.isLoggedIn && (
                              <React.Fragment>
                                    <li  className="nav__item">
                                          <NavLink to="/message" ><i className="fas fa-envelope icon icon__message"></i><p>Message</p></NavLink>
                                    </li>
                                    <li className="nav__item nav__profile flex-column">
                                          <img src={context.user.image && context.user.image} className="icon__profile"/>
                                          <ul className="flex-column">
                                                <li>Hello <strong>{context.user.firstName}</strong></li>
                                                <li> <NavLink to="/profile">Your profile</NavLink></li>
                                                <li onClick={handleLogout}>Log out</li>
                                          </ul>
                                    </li>


                              </React.Fragment>
                        )}

                        {!context.isLoggedIn&& (
                              <React.Fragment>
                                    <li><NavLink to="/signup" className="btn">Sign up</NavLink> </li>
                                    <li ><NavLink to="/login" className="btn btn__login">Log in</NavLink></li>
                              </React.Fragment>
                        )}

                  </ul>
            </nav>
      )
}

export default withUser(NavMain);
