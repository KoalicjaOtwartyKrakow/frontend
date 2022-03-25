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
const AccommodationItemAvailability = () => {
    const accommodation = useContext(AccommodationContext);
    const { t } = useTranslation(["accommodations"]);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'vacanciesTaken' does not exist on type '... Remove this comment to see the full error message
    const { vacanciesTaken, vacanciesTotal, status } = accommodation;
    const className = "accommodation-availability w-100";

    if (status === AccommodationStatus.REJECTED) {
        return null;
        // return (
        //     <Badge color="danger" className={className}>
        //         {t("accommodations.rejected")}
        //     </Badge>
        // );
    }

    if (vacanciesTaken >= vacanciesTotal) {
        return (
            <Badge color="danger" className={className}>
                {t("accommodations:list.item.capacityNone")}
            </Badge>
        );
    }

    const badgeColor = vacanciesTaken === 0 ? "success" : "info";

    return (
        <Badge color={badgeColor} className={className}>
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            <span className="accommodation-availability__count-allocated">{accommodation.vacanciesTaken}</span>
            {" / "}
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            <span className="accommodation-availability__count-max">{accommodation.vacanciesTotal}</span>
        </Badge>
    );
};

export default AccommodationItemAvailability;
