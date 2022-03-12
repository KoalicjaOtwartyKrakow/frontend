import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import { GuestStatus } from "models/constants/AccomodationStatus";

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

    const className = "d-block w-75 mb-2";

    const peopleColor = {
        total: "person-color-total",
        male: "person-color-male",
        female: "person-color-female",
        children: "person-color-child",
    };

    return (
        <>
            {peopleTotalCount > 0 && (
                <Badge color={peopleColor.total} className={className}>
                    Total: {peopleMaleCount}
                </Badge>
            )}

            {peopleMaleCount > 0 && (
                <Badge color={peopleColor.male} className={className}>
                    Men: {peopleFemaleCount}
                </Badge>
            )}
            {peopleFemaleCount > 0 && (
                <Badge color={peopleColor.female} className={className}>
                    Women: {peopleMaleCount}
                </Badge>
            )}
            {peopleChildrenCount > 0 && (
                <Badge color={peopleColor.children} className={className}>
                    Children: {peopleChildrenCount}
                </Badge>
            )}
        </>
    );
};

export default GuestItemPeople;
