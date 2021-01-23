import React from 'react'
import "../styles/PopUp.css";

function PopUp({ message,btnOne, btnTwo, handleBtnOne, handleBtnTwo }) {
      return (
            <div className="overlay">
                  <div className="PopUp__container flex-row-center">
                        <h2 className="margin-bottom">{message}</h2>
                        <div className="flex-row-space-evenly btn-list">
                        {btnOne && <button onClick={e => handleBtnOne(e)} className="btn btn-action">{btnOne}</button>}
                        <button onClick={e => handleBtnTwo(e)} className="btn btn-action">{btnTwo}</button>
                           
                        </div>
                  </div>
            </div>

      )
}

export default PopUp
