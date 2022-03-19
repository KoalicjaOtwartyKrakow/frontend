import React, { useContext } from "react";
import { HostContext } from "components/host/HostContext";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemContactDetails = () => {
    const host = useContext(HostContext);

    if (!host) {
        console.error(
            "[HostListItem] Error: host is undefined. Disabling rendering"
        );
        return <address>Error: no host data</address>;
    }

    const HostItemContactDetail = ({ detail, lineBreak = true }) => {
        if (!detail) {
            return null;
        }
        return (
            <>
                <span>{detail}</span>
                {lineBreak && <br />}
            </>
        );
    };

    const hasPhoneCallPreference =
        (host.callAfter || host.callBefore) && host.phoneNumber;

    return (
        <address>
            <span className="fw-semibold">{host.fullName}</span> <br />
            <HostItemContactDetail detail={host.email} />
            {host.phoneNumber && <span>📞 {host.phoneNumber}</span>}
            {hasPhoneCallPreference && (
                <span>
                    {" "}
                    🕑 {host.callAfter} - {host.callBefore}
                </span>
            )}
        </address>
    );
};

export default HostItemContactDetails;
