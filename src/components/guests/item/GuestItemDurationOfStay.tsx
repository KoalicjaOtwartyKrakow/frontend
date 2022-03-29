import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { DurationOfStaySubfields } from "components/guest/DurationOfStaySubfields";
import { useTranslation } from "react-i18next";
import { TimeUnit } from "models/constants/TimeUnit";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemDurationOfStay = () => {
    /**
     *
     * @type {Guest}
     */
    const guest = useContext(GuestContext);
    const durationOfStaySubfields = DurationOfStaySubfields.fromJoinedField(guest.durationOfStay);
    const { t } = useTranslation(["guest"]);
    const humanTimeUnitSuffixes = {
        [TimeUnit.DAY]: t("guest:timeUnit.day", { count: durationOfStaySubfields.dimensionlessValue }),
        [TimeUnit.WEEK]: t("guest:timeUnit.week", { count: durationOfStaySubfields.dimensionlessValue }),
        [TimeUnit.MONTH]: t("guest:timeUnit.month", { count: durationOfStaySubfields.dimensionlessValue }),
    };

    return (
        <span className="guest__duration-of-stay">
            {`${durationOfStaySubfields.dimensionlessValue} ${humanTimeUnitSuffixes[durationOfStaySubfields.unit]}`}
        </span>
    );
};

export default GuestItemDurationOfStay;
