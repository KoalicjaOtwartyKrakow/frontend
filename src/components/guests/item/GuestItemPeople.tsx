import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestContext'... Remove this comment to see the full error message
import { GuestContext } from "components/guest/GuestContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestPriority... Remove this comment to see the full error message
import GuestPriorityStatusBadge from "components/guest/GuestPriorityStatusBadge";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/shared/constants/Gu... Remove this comment to see the full error message
import { GuestPeopleCountBadgeColor } from "components/shared/constants/GuestColorScheme";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemPeople = () => {
    const guest = useContext(GuestContext);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'peopleTotalCount' does not exist on type... Remove this comment to see the full error message
    const { peopleTotalCount, peopleMaleCount, peopleFemaleCount, children } = guest;
    const peopleChildrenCount = children.length;

    return (
        <>
            <GuestPriorityStatusBadge color={GuestPeopleCountBadgeColor.TOTAL} label={peopleTotalCount} />
            <GuestPriorityStatusBadge color={GuestPeopleCountBadgeColor.MALE} label={peopleMaleCount} />
            <GuestPriorityStatusBadge color={GuestPeopleCountBadgeColor.FEMALE} label={peopleFemaleCount} />
            <GuestPriorityStatusBadge color={GuestPeopleCountBadgeColor.CHILDREN} label={peopleChildrenCount} />
        </>
    );
};

export default GuestItemPeople;
