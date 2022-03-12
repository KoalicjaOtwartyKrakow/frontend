import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { getFormattedDate } from "shared/datetime";
import classNames from "classnames";
import moment from "moment-es6";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemPriorityDate = () => {
    /**
     *
     * @type {Guest}
     */
    const guest = useContext(GuestContext);
    const { priorityDate } = guest;

    const formattedPriorityDate = getFormattedDate(priorityDate);

    const differenceInDays = moment().diff(priorityDate, "days");

    const isGuestPresentSinceToday = differenceInDays === 0;
    const isGuestPresentSinceYesterday = differenceInDays === 1;
    const isGuestPresentSinceLessThanWeek =
        differenceInDays > 1 && differenceInDays < 7;
    const isGuestPresentMoreThanAWeek =
        differenceInDays >= 7 && differenceInDays < 14;
    const isGuestPresentMoreThanTwoWeeks = differenceInDays >= 14;

    // UX: this would probably need a color scheme instead, this was just quicker to implement
    const className = classNames("guest__priority-date", {
        "fw-bolder": isGuestPresentSinceToday,
        "fw-bold": isGuestPresentSinceYesterday,
        "fw-semibold": isGuestPresentSinceLessThanWeek,
        "fw-normal": isGuestPresentMoreThanAWeek,
        "fw-lighter": isGuestPresentMoreThanTwoWeeks,
    });

    return <span className={className}>{formattedPriorityDate}</span>;
};

export default GuestItemPriorityDate;
