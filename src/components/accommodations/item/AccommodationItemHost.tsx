import React, { useContext } from "react";

import { AccommodationContext } from "components/accommodation/AccommodationContext";
import Accommodation from "models/Accommodation";

const AccommodationItemHost = () => {
    const accommodation = useContext<Accommodation>(AccommodationContext);

    const { host } = accommodation;
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
