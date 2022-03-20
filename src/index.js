import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "core-js/proposals/reflect-metadata";
import "styles/bootstrap-pre-custom.sass";
import "styles/bootstrap-post-custom.sass";
import "styles/kokon-theme.sass";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import "./index.sass";
import App from "App";
import { baseUrl, timeout } from "services/Api/constants";
import { appConfig } from "constants/AppConfig";
import "./i18n";
// import reportWebVitals from './reportWebVitals';
import "mocks/index";

Sentry.init({
    dsn: appConfig.sentryDsn,
    integrations: [new BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: appConfig.sentryTracesSampleRate,
});

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = timeout;

ReactDOM.render(
    <BrowserRouter basename={appConfig.routerBasename}>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
