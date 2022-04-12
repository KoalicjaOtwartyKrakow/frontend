export const appConfig = Object.freeze({
    gsi: Object.freeze({
        clientId: process.env.REACT_APP_KOKON_GSI_CLIENT_ID,
    }),
    publicUrl: process.env.PUBLIC_URL,
    routerBasename: process.env.REACT_APP_KOKON_ROUTER_BASENAME,
    routerOverride: {
        accommodations: process.env.REACT_APP_KOKON_OVERRIDE_ROUTE_ACCOMMODATIONS || "",
        guests: process.env.REACT_APP_KOKON_OVERRIDE_ROUTE_GUESTS || "",
        hosts: process.env.REACT_APP_KOKON_OVERRIDE_ROUTE_HOSTS || "",
    },
    sentryDsn: process.env.REACT_APP_SENTRY_DSN,

    sentryTracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || "1.0"),
    defaultTimeout: Number(process.env.REACT_APP_KOKON_API_TIMEOUT || 10000),
    useMocks: process.env.REACT_APP_KOKON_API_USE_MOCKS === "true" && process.env.NODE_ENV === "development",
    checkTokenInterval: Number(process.env.REACT_APP_CHECK_TOKEN_INTERVAL || 10000),
});
