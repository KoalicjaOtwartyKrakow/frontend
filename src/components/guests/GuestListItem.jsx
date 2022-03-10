import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useTranslation } from "react-i18next";

import "components/guests/GuestListItem.sass";

/**
 *
 * @param {Accommodation} accommodation
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const GuestListItem = ({ guest, onEdit, onRemove }) => {
    const { t } = useTranslation();

    const { id } = guest;
    const handleEdit = () => onEdit(id);

    return (
        <tr key={id} onClick={handleEdit} className="pointer">
            <td>{guest.fullName}</td>
            <td>{guest.phoneNumber}</td>
            <td> {guest.status}</td>
            <td>{guest.priority}</td>
            <td>{guest.number}</td>
            <td>
                <ButtonGroup>
                    <Button
                        color="danger"
                        outline
                        onClick={(event) => onRemove(id, event)}
                    >
                        {t("guests.delete")}
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default GuestListItem;
