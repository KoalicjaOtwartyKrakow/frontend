import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guests/GuestListIte... Remove this comment to see the full error message
import GuestListItem from "components/guests/GuestListItem";

const GuestList = ({ guests }: any) => {
    const { t } = useTranslation(["guests"]);
    const navigate = useNavigate();

    const getEditRoute = (guestId: any) => {
        return generatePath(AppRoutes.GUEST_EDIT, { guestId });
    };

    const onRemove = () => {};

    const onEdit = (guestId: any) => {
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
                {guests.map((guest: any) => {
                    const { uuid } = guest;
                    return <GuestListItem key={uuid} guest={guest} onEdit={onEdit} onRemove={onRemove} />;
                })}
            </tbody>
        </Table>
    );
};

export default GuestList;
