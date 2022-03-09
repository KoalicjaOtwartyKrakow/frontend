import React, { useContext } from "react";
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import { AccommodationStatus } from "models/constants/AccomodationStatus";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemAvailability = () => {
    const accommodation = useContext(AccommodationContext);
    const { t } = useTranslation();

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
                {t("accommodations.none")}
            </Badge>
        );
    }

    const badgeColor = vacanciesTaken === 0 ? "success" : "info";

    return (
        <Badge color={badgeColor} className={className}>
            <span className="accommodation-availability__count-allocated">
                {accommodation.vacanciesTaken}
            </span>
            {" / "}
            <span className="accommodation-availability__count-max">
                {accommodation.vacanciesTotal}
            </span>
        </Badge>
    );
};

export default AccommodationItemAvailability;
