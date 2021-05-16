import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
ReactDOM.render(
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
    <CookiesProvider>
            <App />
    </CookiesProvider>
    
  </BrowserRouter>,
  document.getElementById('root')
);


