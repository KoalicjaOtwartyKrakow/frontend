import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Accommodation... Remove this comment to see the full error message
import { AccommodationStatus } from "models/constants/AccommodationStatus";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemStatus = () => {
    const accommodation = useContext(AccommodationContext);
    const { t } = useTranslation(["accommodation"]);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type 'unknown'... Remove this comment to see the full error message
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
