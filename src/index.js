import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from './components/Auth/UserProvider';
import { BrowserRouter } from 'react-router-dom';




ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


