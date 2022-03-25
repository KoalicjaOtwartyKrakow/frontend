import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationContext } from "components/accommodation/AccommodationContext";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemHost = () => {
    const accommodation = useContext(AccommodationContext);
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const { host } = accommodation.host;
    return (
        <>
            <span className="fw-semibold">{host.fullName}</span>
            {host.email && (
                <>
                    <br />
                    <a href={`mailto:${host.email}`}>{host.email}</a>
                </>
            )}
            <br />
            <span>{host.phoneNumber}</span>
        </>
    );
};

export default AccommodationItemHost;
