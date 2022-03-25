import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostContext' o... Remove this comment to see the full error message
import { HostContext } from "components/host/HostContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/hosts/item/HostItem... Remove this comment to see the full error message
import HostItemLanguagesSpoken from "components/hosts/item/HostItemLanguagesSpoken";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/hosts/item/HostItem... Remove this comment to see the full error message
import HostItemStatus from "components/hosts/item/HostItemStatus";

/**
 *
 * @param {Host} host
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const HostListItem = ({ host, onEdit, onRemove }: any) => {
    if (!host) {
        console.error("[HostListItem] Error: host is undefined. Disabling rendering");
        return null;
    }

    const { id } = host;
    const handleEdit = () => onEdit(id);

    return (
        <HostContext.Provider value={host}>
            <tr onClick={handleEdit} className="pointer">
                <td>{host.fullName}</td>
                <td>{host.email}</td>
                <td>{host.phoneNumber}</td>
                <td>
                    <HostItemLanguagesSpoken />
                </td>
                <td>
                    <HostItemStatus />
                </td>
                <td>{host.comments}</td>
            </tr>
        </HostContext.Provider>
    );
};

export default HostListItem;
