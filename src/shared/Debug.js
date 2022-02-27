const APARTMENTS_FETCH_DELAY = 250;

/**
 *
 * @param {number} delay Time in ms to delay the call
 * @param {function} f Function to execute
 * @returns {Promise<TimerHandler>}
 */
const delay = (delay, f) => new Promise((resolve, reject) => setTimeout(f, delay, resolve, reject));

const emptyFn = () => {};

export {
  APARTMENTS_FETCH_DELAY,
  delay,
  emptyFn
};