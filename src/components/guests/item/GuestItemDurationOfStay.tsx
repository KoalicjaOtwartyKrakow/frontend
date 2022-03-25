import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestContext'... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'durationOfStay' does not exist on type '... Remove this comment to see the full error message
    const { durationOfStay } = guest;

    return <span className="guest__duration-of-stay">{durationOfStay}</span>;
};

export default GuestItemDurationOfStay;
