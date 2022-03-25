export const appConfig = Object.freeze({
    dateFormat: process.env.REACT_APP_KOKON_DATE_FORMAT,
    gsi: Object.freeze({
        clientId: process.env.REACT_APP_KOKON_GSI_CLIENT_ID,
    }),
    publicUrl: process.env.PUBLIC_URL,
    routerBasename: process.env.REACT_APP_KOKON_ROUTER_BASENAME,
    sentryDsn: process.env.REACT_APP_SENTRY_DSN,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    sentryTracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE),
    useMocks: process.env.REACT_APP_KOKON_API_USE_MOCKS === "true" && process.env.NODE_ENV === "development",
});
