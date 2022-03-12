import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useTranslation } from "react-i18next";

import "components/guests/GuestListItem.sass";

/**
 *
 * @param {Guest} guest
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const GuestListItem = ({ guest, onEdit, onRemove }) => {
    const { t } = useTranslation(["guests"]);

    const { id } = guest;
    const handleEdit = () => onEdit(id);

    return (
        <tr onClick={handleEdit} className="pointer">
            <td>{guest.fullName}</td>
            <td>{guest.phoneNumber}</td>
            <td>{guest.priorityStatus}</td>
            <td>{guest.priorityDate}</td>
            <td>{guest.peopleTotalCount}</td>
            <td>{guest.stayDuration}</td>
            <td></td>
        </tr>
    );
};

export default GuestListItem;
