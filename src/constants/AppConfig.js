export const appConfig = Object.freeze({
    publicUrl: process.env.PUBLIC_URL,
    dateFormat: process.env.REACT_APP_KOKON_DATE_FORMAT,
    routerBasename: process.env.REACT_APP_KOKON_ROUTER_BASENAME,
    sentryDsn: process.env.REACT_APP_SENTRY_DSN,
    sentryTracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE),
});
