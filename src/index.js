import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/proposals/reflect-metadata';
import 'styles/bootstrap-pre-custom.sass';
import 'styles/bootstrap-post-custom.sass';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './index.sass';
import App from 'App';
import { Api } from 'services/Api';
import { appConfig } from 'constants/AppConfig';
// import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = Api.baseUrl;
axios.defaults.timeout = Api.timeout;

ReactDOM.render(
  <BrowserRouter basename={appConfig.routerBasename}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
