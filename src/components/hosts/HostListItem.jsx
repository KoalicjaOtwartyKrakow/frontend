import React from "react";
import { HostContext } from "components/host/HostContext";
import HostItemStatus from "components/hosts/item/HostItemStatus";
import HostItemLanguagesSpoken from "components/hosts/item/HostItemLanguagesSpoken";

/**
 *
 * @param {Host} host
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const HostListItem = ({ host, onEdit, onRemove }) => {
    const { id } = host;
    const handleEdit = () => onEdit(id);

    return (
        <HostContext.Provider value={host}>
            <tr onClick={handleEdit} className="pointer">
                <td>{host.fullName}</td>
                <td>{host.email}</td>
                <td>{host.phoneNumber}</td>
                <td>
                    <HostItemStatus />
                </td>
                <td>
                    <HostItemLanguagesSpoken />
                </td>
                <td>{host.comments}</td>
            </tr>
        </HostContext.Provider>
    );
};

export default HostListItem;
