const reportWebVitals = (onPerfEntry: any) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'web-vitals' or its correspondi... Remove this comment to see the full error message
        import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

export default reportWebVitals;
