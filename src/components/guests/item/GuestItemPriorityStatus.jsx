import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemPriorityStatus = () => {
    /**
     * @type {Guest}
     */
    const guest = useContext(GuestContext);
    const { t } = useTranslation(["guest"]);

    const { priorityStatus } = guest;

    const colorFromStatus = {
        [GuestPriorityStatus.ACCOMMODATION_FOUND]:
            "guest-priority-status-accommodation-found",
        [GuestPriorityStatus.ACCOMMODATION_NOT_NEEDED]:
            "guest-priority-status-accommodation-not-needed",
        [GuestPriorityStatus.EN_ROUTE_POLAND]:
            "guest-priority-status-en-route-poland",
        [GuestPriorityStatus.EN_ROUTE_UKRAINE]:
            "guest-priority-status-en-route-ukraine",
        [GuestPriorityStatus.IN_CRISIS_POINT]:
            "guest-priority-status-in-crisis-point",
        [GuestPriorityStatus.IN_KRAKOW]: "guest-priority-status-in-krakow",
    };

    const labelFromStatus = {
        [GuestPriorityStatus.ACCOMMODATION_FOUND]: t(
            "guest:priorityStatus.accommodationFound"
        ),
        [GuestPriorityStatus.ACCOMMODATION_NOT_NEEDED]: t(
            "guest:priorityStatus.accommodationNotRequired"
        ),
        [GuestPriorityStatus.EN_ROUTE_POLAND]: t(
            "guest:priorityStatus.enRoutePoland"
        ),
        [GuestPriorityStatus.EN_ROUTE_UKRAINE]: t(
            "guest:priorityStatus.enRouteUkraine"
        ),
        [GuestPriorityStatus.IN_CRISIS_POINT]: t(
            "guest:priorityStatus.inCrisisPoint"
        ),
        [GuestPriorityStatus.IN_KRAKOW]: t("guest:priorityStatus.inCracow"),
    };

    const statusBadgeColor = colorFromStatus[priorityStatus];
    const statusLabel = labelFromStatus[priorityStatus];
    console.log(statusLabel, statusBadgeColor, priorityStatus);

    return (
        <Badge color={statusBadgeColor} className="guest-status w-75">
            <span className="guest-status__label">{statusLabel}</span>
        </Badge>
    );
};

export default GuestItemPriorityStatus;
