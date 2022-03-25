import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestContext'... Remove this comment to see the full error message
import { GuestContext } from "components/guest/GuestContext";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemPhone = () => {
    /**
     *
     * @type {Guest}
     */
    const guest = useContext(GuestContext);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'phoneNumber' does not exist on type 'unk... Remove this comment to see the full error message
    const { phoneNumber } = guest;
    return (
        <address className="guest guest__contact-info mb-0">
            <span className="guest__contact-info__phone fw-semibold">{phoneNumber}</span>
        </address>
    );
};

export default GuestItemPhone;
