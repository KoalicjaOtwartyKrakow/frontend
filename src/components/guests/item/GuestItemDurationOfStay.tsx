import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { useTranslation } from "react-i18next";
import { TimeUnit } from "models/constants/TimeUnit";
import DurationSerializer from "serializers/DurationSerializer";

const GuestItemDurationOfStay = () => {
    const guest = useContext(GuestContext);
    const durationSerializer = new DurationSerializer();
    const { t } = useTranslation(["guest"]);

    const { unit, value } = durationSerializer.getValueAndUnitFromDuration(guest.durationOfStay, [
        TimeUnit.MONTH,
        TimeUnit.WEEK,
        TimeUnit.DAY,
    ]);

    const count = Number(value);

    const i18nTimeUnits: { [key: string]: string } = {
        [TimeUnit.DAY]: t("guest:timeUnit.day", { count }),
        [TimeUnit.WEEK]: t("guest:timeUnit.week", { count }),
        [TimeUnit.MONTH]: t("guest:timeUnit.month", { count }),
    };

    const i18nTimeUnit = i18nTimeUnits[unit];

    return (
        <span className="guest__duration-of-stay">
            {value} {i18nTimeUnit}
        </span>
    );
};

export default GuestItemDurationOfStay;
