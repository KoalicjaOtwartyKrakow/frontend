import React from "react";

import { AccommodationContext } from "components/accommodation/AccommodationContext";
import AccommodationItemAddress from "components/accommodations/item/AccommodationItemAddress";
import AccommodationItemAvailability from "components/accommodations/item/AccommodationItemAvailability";
import AccommodationItemStatus from "components/accommodations/item/AccommodationItemStatus";
import AccommodationItemCity from "components/accommodations/item/AccommodationItemCity";
import AccommodationItemInfo from "components/accommodations/item/AccommodationItemInfo";

/**
 *
 * @param {Accommodation} accommodation
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const AccommodationListItem = ({ accommodation, onEdit, onRemove }) => {
    const { guid } = accommodation;
    const handleEdit = () => onEdit(guid);

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
