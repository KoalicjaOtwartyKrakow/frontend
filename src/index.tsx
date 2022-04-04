import "shared/wdyr";
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
import { configure } from "axios-hooks";
import "./index.sass";
import App from "App";
import { baseURL } from "services/Api/constants";
import { appConfig } from "constants/AppConfig";
import "./i18n";

if (process.env.NODE_ENV === "production") {
    Sentry.init({
        dsn: appConfig.sentryDsn,
        integrations: [new BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: appConfig.sentryTracesSampleRate,
    });
}

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = appConfig.defaultTimeout;

const defaultOptions = { manual: true, autoCancel: false };

configure({ axios, defaultOptions });

ReactDOM.render(
    <BrowserRouter basename={appConfig.routerBasename}>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
