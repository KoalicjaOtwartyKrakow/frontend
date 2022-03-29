import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemFullName = () => {
    const guest = useContext(GuestContext);

    const { fullName } = guest;
    return (
        <>
            <span className="fw-semibold">{fullName}</span>
        </>
    );
};

export default GuestItemFullName;
