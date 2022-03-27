import React from "react";

import "components/guests/GuestListItem.sass";

import { GuestContext } from "components/guest/GuestContext";

import GuestItemFullName from "components/guests/item/GuestItemFullName";

import GuestItemPhone from "components/guests/item/GuestItemPhone";

import GuestItemPriorityStatus from "components/guests/item/GuestItemPriorityStatus";

import GuestItemPriorityDate from "components/guests/item/GuestItemPriorityDate";

import GuestItemPeople from "components/guests/item/GuestItemPeople";

import GuestItemInfo from "components/guests/item/GuestItemInfo";

import GuestItemDurationOfStay from "components/guests/item/GuestItemDurationOfStay";

/**
 *
 * @param {Guest} guest
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const GuestListItem = ({ guest, onEdit, onRemove }: any) => {
    const { id } = guest;
    console.log(guest);
    const handleEdit = () => onEdit(id);

    return (
        <GuestContext.Provider value={guest}>
            <tr onClick={handleEdit} className="pointer">
                <td className="guest__cell-full-name">
                    <GuestItemFullName />
                </td>
                <td className="guest__cell-phone">
                    <GuestItemPhone />
                </td>
                <td className="guest__cell-priority-status">
                    <GuestItemPriorityStatus />
                </td>
                <td className="guest__cell-priority-date">
                    <GuestItemPriorityDate />
                </td>
                <td className="guest__cell-people">
                    <GuestItemPeople />
                </td>
                <td className="guest__cell-duration">
                    <GuestItemDurationOfStay />
                </td>
                <td className="guest__cell-info">
                    <GuestItemInfo />
                </td>
            </tr>
        </GuestContext.Provider>
    );
};

export default GuestListItem;
