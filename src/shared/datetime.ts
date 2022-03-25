import moment from "moment-es6";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppConfig' or its co... Remove this comment to see the full error message
import { appConfig } from "constants/AppConfig";

/**
 *
 * @param {moment.Moment|undefined} value
 * @returns {string}
 */
export const getFormattedDate = (value: any) => (moment.isMoment(value) ? value.format(appConfig.dateFormat) : "");
export const getFormattedDateTime = (value: any) => (moment.isMoment(value) ? value.format("LLL") : "");
