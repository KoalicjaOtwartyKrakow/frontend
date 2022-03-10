import React, { useContext } from "react";
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import { AccommodationStatus } from "models/constants/AccomodationStatus";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemStatus = () => {
    const accommodation = useContext(AccommodationContext);
    const { t } = useTranslation(["accommodation"]);

    const { status } = accommodation;

    const colorFromStatus = {
        [AccommodationStatus.CREATED]: "info",
        [AccommodationStatus.VERIFIED]: "success",
        [AccommodationStatus.REJECTED]: "danger",
    };

    const labelFromStatus = {
        [AccommodationStatus.CREATED]: t("accommodation:status.created"),
        [AccommodationStatus.VERIFIED]: t("accommodation:status.verified"),
        [AccommodationStatus.REJECTED]: t("accommodation:status.rejected"),
    };

    const statusBadgeColor = colorFromStatus[status];
    const statusLabel = labelFromStatus[status];

    return (
        <Badge color={statusBadgeColor} className="accommodation-status w-100">
            <span className="accommodation-status__label">{statusLabel}</span>
        </Badge>
    );
};

export default AccommodationItemStatus;
