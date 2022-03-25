import React from "react";

import "components/guests/GuestListItem.sass";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestContext'... Remove this comment to see the full error message
import { GuestContext } from "components/guest/GuestContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/item/GuestIt... Remove this comment to see the full error message
import GuestItemFullName from "components/guests/item/GuestItemFullName";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/item/GuestIt... Remove this comment to see the full error message
import GuestItemPhone from "components/guests/item/GuestItemPhone";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/item/GuestIt... Remove this comment to see the full error message
import GuestItemPriorityStatus from "components/guests/item/GuestItemPriorityStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/item/GuestIt... Remove this comment to see the full error message
import GuestItemPriorityDate from "components/guests/item/GuestItemPriorityDate";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/item/GuestIt... Remove this comment to see the full error message
import GuestItemPeople from "components/guests/item/GuestItemPeople";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/item/GuestIt... Remove this comment to see the full error message
import GuestItemInfo from "components/guests/item/GuestItemInfo";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/item/GuestIt... Remove this comment to see the full error message
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
