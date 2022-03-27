import React, { useContext } from "react";

import { HostContext } from "components/host/HostContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";

import { HostStatus } from "models/constants/HostStatus";

/**
 *
 * @returns {JSX.Element}
 */
const HostItemStatus = () => {
    const host = useContext(HostContext);
    const { t } = useTranslation(["host"]);

    const { status } = host;

    const colorFromStatus = {
        [HostStatus.CREATED]: "info",
        [HostStatus.VERIFIED]: "success",
        [HostStatus.REJECTED]: "danger",
    };

    const labelFromStatus = {
        [HostStatus.CREATED]: t("host:status.created"),
        [HostStatus.VERIFIED]: t("host:status.verified"),
        [HostStatus.REJECTED]: t("host:status.rejected"),
    };

    const statusBadgeColor = colorFromStatus[status];
    const statusLabel = labelFromStatus[status];

    return (
        <Badge color={statusBadgeColor} className="host-status w-100">
            <span className="host-status__label">{statusLabel}</span>
        </Badge>
    );
};

export default HostItemStatus;
