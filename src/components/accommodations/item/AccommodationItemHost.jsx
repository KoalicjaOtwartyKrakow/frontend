import React, { useContext } from "react";
import { AccommodationContext } from "components/accommodation/AccommodationContext";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemHost = () => {
    const accommodation = useContext(AccommodationContext);
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
