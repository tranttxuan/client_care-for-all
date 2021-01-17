import React from 'react'
import { NavLink } from 'react-router-dom';
import "../styles/PopUp.css";

function PopUp({ message,btnOne, btnTwo, handleBtnOne, handleBtnTwo }) {
      return (
            <div className="PopUp">
                  <div className="PopUp__container">
                        <h1>{message}</h1>
                        <div>
                        {btnOne && <button onClick={e => handleBtnOne(e)}>{btnOne}</button>}
                        <button onClick={e => handleBtnTwo(e)}>{btnTwo}</button>
                           
                        </div>
                  </div>
            </div>

      )
}

export default PopUp
