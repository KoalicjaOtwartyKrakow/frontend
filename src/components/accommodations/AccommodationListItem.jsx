import React from "react";
import { Badge, Button, ButtonGroup } from "reactstrap";
import { useTranslation } from "react-i18next";

import { AccommodationContext } from "components/accommodation/AccommodationContext";
import AccommodationItemAddress from "components/accommodations/item/AccommodationItemAddress";
import AccommodationItemAvailability from "components/accommodations/item/AccommodationItemAvailability";
import AccommodationItemStatus from "components/accommodations/item/AccommodationItemStatus";
import AccommodationItemCity from "components/accommodations/item/AccommodationItemCity";
/**
 *
 * @param {Accommodation} accommodation
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const AccommodationListItem = ({ accommodation, onEdit, onRemove }) => {
    const { t } = useTranslation();

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
                <td>{accommodation.description}</td>
                <td>
                    <ButtonGroup>
                        <Button
                            color="danger"
                            className="w-100"
                            outline
                            onClick={(event) => onRemove(id, event)}
                        >
                            {t("accommodations.delete")}
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        </AccommodationContext.Provider>
    );
};

export default AccommodationListItem;
