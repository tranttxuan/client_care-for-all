import React from 'react';
import { NavLink } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import withUser from "../Auth/withUser"

function NavMain(props) {
      const handleLogout = () => {
            props.context.removeUser();
      }
      
      return (

            <div>
                  <NavLink to="/signup">Sign up</NavLink>
                  <NavLink to="/login">Log in</NavLink>
                  <p onClick={handleLogout}>Logout</p>
            </div>
      )
}

export default withUser(NavMain);
