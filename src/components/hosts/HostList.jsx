import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import "components/hosts/HostList.sass";
import { AppRoutes } from "constants/AppRoutes";
import HostListItem from "components/hosts/HostListItem";

const HostList = ({ hosts }) => {
    const { t } = useTranslation(["hosts"]);
    const navigate = useNavigate();

    const getEditRoute = (hostId) => {
        return generatePath(AppRoutes.HOST_EDIT, { hostId });
    };

    const onEdit = (hostId) => {
        const path = getEditRoute(hostId);
        navigate(path);
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

export default HostList;
