import React, { useContext } from "react";
import { HostContext } from "components/host/HostContext";
import { useTranslation } from "react-i18next";
import { Badge } from "reactstrap";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemStatus = () => {
    /**
     *
     * @type {Host}
     */
    const host = useContext(HostContext);
    const { t } = useTranslation(["host"]);

    const { status } = host;
    return <Badge>{status}</Badge>;
};

export default HostItemStatus;
