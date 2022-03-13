import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { useTranslation } from "react-i18next";
import GuestPriorityStatusBadge from "components/guest/GuestPriorityStatusBadge";
import { GuestPeopleCountBadgeColor } from "components/shared/constants/GuestColorScheme";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemPeople = () => {
    const guest = useContext(GuestContext);
    const { t } = useTranslation(["guests"]);

    const { peopleTotalCount, peopleMaleCount, peopleFemaleCount, children } =
        guest;
    const peopleChildrenCount = children.length;

    return (
        <>
            <GuestPriorityStatusBadge
                color={GuestPeopleCountBadgeColor.TOTAL}
                label={peopleTotalCount}
            />
            <GuestPriorityStatusBadge
                color={GuestPeopleCountBadgeColor.MALE}
                label={peopleMaleCount}
            />
            <GuestPriorityStatusBadge
                color={GuestPeopleCountBadgeColor.FEMALE}
                label={peopleFemaleCount}
            />
            <GuestPriorityStatusBadge
                color={GuestPeopleCountBadgeColor.CHILDREN}
                label={peopleChildrenCount}
            />
        </>
    );
};

export default GuestItemPeople;
