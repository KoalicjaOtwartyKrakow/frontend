import React from "react";
import { generatePath, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import compose from "just-compose";
import { withToastManager } from "react-toast-notifications";

import { Routes } from "constants/Routes";
import GuestListItem from "components/guests/GuestListItem";
import { Toast } from "components/atoms/Toast";
import withGuests from "components/guests/withGuests";

const GuestList = ({ guests, history, toastManager }) => {
    const { t } = useTranslation(["guests"]);

    const toast = new Toast(toastManager);

    const getEditRoute = (guestId) => {
        return generatePath(Routes.GUEST_EDIT, { guestId });
    };

    const onEdit = (guestId) => {
        const path = getEditRoute(guestId);
        history.push(path);
    };

    const onRemove = (guestId, event) => {
        toast.info(
            "Ta akcja będzie otwierać okno modalne z potwierdzeniem usunięcia " +
                guestId,
            "Jeszcze nie działa :("
        );
        event.stopPropagation();
    };

    const columnNames = [
        "fullName",
        "phoneNumber",
        "priorityStatus",
        "priorityDate",
        "totalPeople",
        "duration",
        "information",
    ];

    return (
        <Table hover striped responsive>
            <colgroup>
                {columnNames.map((columnName) => (
                    <col
                        className={`accommodation__col-${columnName}`}
                        key={columnName}
                    />
                ))}
            </colgroup>
            <thead className="thead-dark">
                <tr>
                    {columnNames.map((columnName) => (
                        <th key={columnName}>
                            {t(`guests:list.columnHeader:${columnName}`)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {guests.map((guest) => {
                    const { id } = guest;
                    return (
                        <GuestListItem
                            key={id}
                            guest={guest}
                            onEdit={onEdit}
                            onRemove={onRemove}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
};

export default compose(withGuests, withToastManager, withRouter)(GuestList);
