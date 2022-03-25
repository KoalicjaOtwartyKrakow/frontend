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
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'App' or its corresponding type... Remove this comment to see the full error message
import App from "App";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { baseURL, timeout } from "services/Api/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppConfig' or its co... Remove this comment to see the full error message
import { appConfig } from "constants/AppConfig";
import "./i18n";
import "mocks/index";

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
axios.defaults.timeout = timeout;

const defaultOptions = { manual: true, autoCancel: false };

configure({ axios, defaultOptions });

ReactDOM.render(
    <BrowserRouter basename={appConfig.routerBasename}>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
