import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import "./components/bootstrap/dist/css/bootstrap.min.css";
import './css/style.css';


axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);