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

    return (
        <Table hover striped responsive>
            <thead className="thead-dark">
                <tr>
                    <th>{t("guests:host")}</th>
                    <th>{t("guests:address")}</th>
                    <th>{t("guests:availability")}</th>
                    <th>{t("guests:volunteer")}</th>
                    <th>{t("guests:description")}</th>
                    <th>{t("guests:actions")}</th>
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
