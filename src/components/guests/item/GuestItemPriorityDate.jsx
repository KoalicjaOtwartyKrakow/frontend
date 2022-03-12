import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { getFormattedDate } from "shared/datetime";

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
    console.log(formattedPriorityDate, priorityDate);
    return (
        <span className="guest__priority-date fw-bold">
            {formattedPriorityDate}
        </span>
    );
};

export default GuestItemPriorityDate;
