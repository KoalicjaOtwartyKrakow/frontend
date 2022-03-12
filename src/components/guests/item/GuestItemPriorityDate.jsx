import { getPolishVoivodeshipNameById } from "models/constants/Address";
import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";

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
    return <span className="guest__priority-date fw-bold">{priorityDate}</span>;
};

export default GuestItemPriorityDate;
