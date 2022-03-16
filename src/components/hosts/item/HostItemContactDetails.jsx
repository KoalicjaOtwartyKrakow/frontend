import React, { useContext } from "react";
import { HostContext } from "components/host/HostContext";
import { useTranslation } from "react-i18next";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemContactDetails = () => {
    const host = useContext(HostContext);
    const { t } = useTranslation(["host"]);

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
