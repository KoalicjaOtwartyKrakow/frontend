import React from "react";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationContext } from "components/accommodation/AccommodationContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/item... Remove this comment to see the full error message
import AccommodationItemAddress from "components/accommodations/item/AccommodationItemAddress";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/item... Remove this comment to see the full error message
import AccommodationItemAvailability from "components/accommodations/item/AccommodationItemAvailability";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/item... Remove this comment to see the full error message
import AccommodationItemStatus from "components/accommodations/item/AccommodationItemStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/item... Remove this comment to see the full error message
import AccommodationItemCity from "components/accommodations/item/AccommodationItemCity";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/item... Remove this comment to see the full error message
import AccommodationItemInfo from "components/accommodations/item/AccommodationItemInfo";

/**
 *
 * @param {Accommodation} accommodation
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const AccommodationListItem = ({ accommodation, onEdit, onRemove }: any) => {
    const { id } = accommodation;
    const handleEdit = () => onEdit(id);

    return (
        <AccommodationContext.Provider value={accommodation}>
            <tr onClick={handleEdit} className="pointer">
                <td>
                    <AccommodationItemCity />
                </td>
                <td>
                    <AccommodationItemAddress />
                </td>
                <td className="accommodation__cell-status">
                    <AccommodationItemStatus />
                </td>
                <td>
                    <AccommodationItemAvailability />
                </td>
                <td>{accommodation.staffComments}</td>
                <td>
                    <AccommodationItemInfo />
                </td>
            </tr>
        </AccommodationContext.Provider>
    );
};

export default AccommodationListItem;
