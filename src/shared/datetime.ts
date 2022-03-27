import moment from "moment-es6";

import { appConfig } from "constants/AppConfig";

/**
 *
 * @param {moment.Moment|undefined} value
 * @returns {string}
 */
export const getFormattedDate = (value: any) => (moment.isMoment(value) ? value.format(appConfig.dateFormat) : "");
export const getFormattedDateTime = (value: any) => (moment.isMoment(value) ? value.format("LLL") : "");
