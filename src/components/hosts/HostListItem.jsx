import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "react-i18next";
import { HostContext } from "components/host/HostContext";

const HostStatusItem = (status) => {
    return <Badge>status</Badge>;
};

const HostLanguageSpokenItem = (languages) => {
    return (
        <div>
            {languages.map((language, index) => (
                <Badge>{language}</Badge>
            ))}
        </div>
    );
};

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
                <td>{HostStatusItem(host.status)}</td>
                <td>{HostLanguageSpokenItem(host.languagesSpoken)}</td>
                <td>{host.comments}</td>
            </tr>
        </HostContext.Provider>
    );
};

export default HostListItem;
