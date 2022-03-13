import React from "react";
import { generatePath, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import compose from "just-compose";
import { withToastManager } from "react-toast-notifications";
// import "components/hosts/HostList.sass";

import { Routes } from "constants/Routes";
import HostListItem from "components/hosts/HostListItem";
import { Toast } from "components/atoms/Toast";
import withHosts from "components/hosts/withHosts";

const HostList = ({ hosts, history, toastManager }) => {
    const { t } = useTranslation(["hosts"]);

    const toast = new Toast(toastManager);

    const getEditRoute = (hostId) => {
        return generatePath(Routes.HOST_EDIT, { hostId });
    };

    const onEdit = (hostId) => {
        const path = getEditRoute(hostId);
        history.push(path);
    };

    const onRemove = (hostId, event) => {
        toast.info(
            "Ta akcja będzie otwierać okno modalne z potwierdzeniem usunięcia lokalu " +
                hostId,
            "Jeszcze nie działa :("
        );
        event.stopPropagation();
    };

    const columnNames = [
        "fullName",
        "email",
        "phoneNumber",
        "languagesSpoken",
        "status",
        "comments",
    ];

    return (
        <Table hover striped responsive>
            <colgroup>
                {columnNames.map((columnName) => (
                    <col
                        className={`host__col-${columnName}`}
                        key={columnName}
                    />
                ))}
            </colgroup>
            <thead className="thead-dark">
                <tr>
                    {columnNames.map((columnName) => (
                        <th key={columnName}>
                            {t(`hosts:list.columnHeader:${columnName}`)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {hosts.map((host) => {
                    const { id } = host;
                    return (
                        <HostListItem
                            key={id}
                            host={host}
                            onEdit={onEdit}
                            onRemove={onRemove}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
};

export default compose(withHosts, withToastManager, withRouter)(HostList);
