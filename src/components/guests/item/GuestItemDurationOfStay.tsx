import React, { useContext } from "react";

import { GuestContext } from "components/guest/GuestContext";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemDurationOfStay = () => {
    /**
     *
     * @type {Guest}
     */
    const guest = useContext(GuestContext);

    const { durationOfStay } = guest;

    return <span className="guest__duration-of-stay">{durationOfStay}</span>;
};

export default GuestItemDurationOfStay;
