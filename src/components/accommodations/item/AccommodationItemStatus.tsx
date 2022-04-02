import React, { useContext } from "react";
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import { AccommodationVerificationStatus } from "models/constants/AccommodationVerificationStatus";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemStatus = () => {
    const accommodation = useContext(AccommodationContext);
    const { t } = useTranslation(["accommodation"]);

    const { status } = accommodation;

    const colorFromStatus = {
        [AccommodationVerificationStatus.CREATED]: "info",
        [AccommodationVerificationStatus.VERIFIED]: "success",
        [AccommodationVerificationStatus.REJECTED]: "danger",
    };

    const labelFromStatus = {
        [AccommodationVerificationStatus.CREATED]: t("accommodation:status.created"),
        [AccommodationVerificationStatus.VERIFIED]: t("accommodation:status.verified"),
        [AccommodationVerificationStatus.REJECTED]: t("accommodation:status.rejected"),
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
