import React, { useContext } from "react";
import { HostContext } from "components/host/HostContext";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemContactDetails = () => {
    const host = useContext(HostContext);

    return (
        <address>
            <span className="fw-semibold">{host.fullName}</span> <br />
            <span>{host.email}</span>
            <span>{host.phoneNumber}</span>
            <span>
                {host.callAfter}:{host.callBefore}
            </span>
        </address>
    );
};

export default HostItemContactDetails;
