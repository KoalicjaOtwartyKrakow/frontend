import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostContext' o... Remove this comment to see the full error message
import { HostContext } from "components/host/HostContext";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemContactDetails = () => {
    const host = useContext(HostContext);

    if (!host) {
        console.error("[HostListItem] Error: host is undefined. Disabling rendering");
        return <address>Error: no host data</address>;
    }

    const HostItemContactDetail = ({ detail, lineBreak = true }: any) => {
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

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const hasPhoneCallPreference = (host.callAfter || host.callBefore) && host.phoneNumber;

    return (
        <address>
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            <span className="fw-semibold">{host.fullName}</span> <br />
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            <HostItemContactDetail detail={host.email} />
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            {host.phoneNumber && (
                <span>
                    <span role="img" aria-label="Phone number">
                        📞
                    </span>{" "}
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    {host.phoneNumber}
                </span>
            )}
            {hasPhoneCallPreference && (
                <span>
                    {" "}
                    <span role="img" aria-label="Calling hours">
                        🕑
                    </span>{" "}
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    {host.callAfter} - {host.callBefore}
                </span>
            )}
        </address>
    );
};

export default HostItemContactDetails;
