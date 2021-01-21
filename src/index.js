import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from './components/Auth/UserProvider';
import { BrowserRouter } from 'react-router-dom';
import "./styles/Reset.css"
import "./styles/Global.css";
import "./styles/Variables.css";
import "./styles/Button.css";



ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


