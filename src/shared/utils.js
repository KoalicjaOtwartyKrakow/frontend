export const sleep = (ms) => {
    if (ms > 0) {
        return new Promise((r) => setTimeout(r, ms));
    }
    return Promise.resolve();
};
export const emptyFn = () => {};
export const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);
