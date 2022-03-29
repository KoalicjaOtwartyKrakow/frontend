import moment from "moment";

export const getFormattedDate = (value?: moment.Moment): string =>
    moment.isMoment(value) ? value.format("YYYY-MM-DD") : "";

export const getFormattedDateTime = (value?: moment.Moment): string =>
    moment.isMoment(value) ? value.format("LLL") : "";
