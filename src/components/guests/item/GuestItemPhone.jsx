import React, { useContext } from "react";
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
    const { phoneNumber } = guest;
    return (
        <address className="guest guest__contact-info">
            <p className="mb-0">
                <span className="guest__contact-info__phone fw-semibold">
                    {phoneNumber}
                </span>
            </p>
        </address>
    );
};

export default GuestItemPhone;
