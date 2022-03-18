import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import GuestPriorityStatusBadge from "components/guest/GuestPriorityStatusBadge";
import { GuestPeopleCountBadgeColor } from "components/shared/constants/GuestColorScheme";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemPeople = () => {
    const guest = useContext(GuestContext);

    const { peopleTotalCount, peopleMaleCount, peopleFemaleCount, childrenAges } =
        guest;
    const peopleChildrenCount = childrenAges.length;

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
