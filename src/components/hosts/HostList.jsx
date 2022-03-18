import React from "react";
import { generatePath, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import "components/hosts/HostList.sass";
import { Routes } from "constants/Routes";
import HostListItem from "components/hosts/HostListItem";

const HostList = ({ hosts }) => {
    const { t } = useTranslation(["hosts"]);
    const history = useHistory();

    const getEditRoute = (hostId) => {
        return generatePath(Routes.HOST_EDIT, { hostId });
    };

    const onEdit = (hostId) => {
        const path = getEditRoute(hostId);
        history.push(path);
    };

    const onRemove = () => {};

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
                    const { guid } = host;
                    return (
                        <HostListItem
                            key={guid}
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

export default HostList;
