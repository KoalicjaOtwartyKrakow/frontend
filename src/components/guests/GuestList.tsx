import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";

import { AppRoutes } from "constants/AppRoutes";
import GuestListItem from "components/guests/GuestListItem";

const GuestList = ({ guests }) => {
    const { t } = useTranslation(["guests"]);
    const navigate = useNavigate();

    const getEditRoute = (guestId) => {
        return generatePath(AppRoutes.GUEST_EDIT, { guestId });
    };

    const onRemove = () => {};

    const onEdit = (guestId) => {
        const path = getEditRoute(guestId);
        navigate(path);
    };

    const columnNames = [
        "fullName",
        "phoneNumber",
        "priorityStatus",
        "priorityDate",
        "totalPeople",
        "durationOfStay",
        "information",
    ];

    return (
        <Table hover striped responsive>
            <colgroup>
                {columnNames.map((columnName) => (
                    <col className={`accommodation__col-${columnName}`} key={columnName} />
                ))}
            </colgroup>
            <thead className="thead-dark">
                <tr>
                    {columnNames.map((columnName) => (
                        <th key={columnName}>{t(`guests:list.columnHeader:${columnName}`)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {guests.map((guest) => {
                    const { uuid } = guest;
                    return <GuestListItem key={uuid} guest={guest} onEdit={onEdit} onRemove={onRemove} />;
                })}
            </tbody>
        </Table>
    );
};

export default GuestList;
