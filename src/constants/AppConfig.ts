export const appConfig = Object.freeze({
    gsi: Object.freeze({
        clientId: process.env.REACT_APP_KOKON_GSI_CLIENT_ID,
    }),
    publicUrl: process.env.PUBLIC_URL,
    routerBasename: process.env.REACT_APP_KOKON_ROUTER_BASENAME,
    sentryDsn: process.env.REACT_APP_SENTRY_DSN,

    sentryTracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || "1.0"),
    useMocks: process.env.REACT_APP_KOKON_API_USE_MOCKS === "true" && process.env.NODE_ENV === "development",
});
