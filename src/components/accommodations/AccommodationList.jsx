import React from "react";
import { generatePath, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import compose from "just-compose";
import { withToastManager } from "react-toast-notifications";

import { Routes } from "constants/Routes";
import AccommodationListItem from "components/accommodations/AccommodationListItem";
import { Toast } from "components/atoms/Toast";
import withAccommodation from "components/accommodations/withAccommodation";

const AccommodationList = ({ accommodations, history, toastManager }) => {
    const { t } = useTranslation();

    const toast = new Toast(toastManager);

    const getEditRoute = (accommodationId) => {
        return generatePath(Routes.ACCOMMODATION_EDIT, { accommodationId });
    };

    const onEdit = (accommodationId) => {
        const path = getEditRoute(accommodationId);
        history.push(path);
    };

    const onRemove = (accommodationId, event) => {
        toast.info(
            "Ta akcja będzie otwierać okno modalne z potwierdzeniem usunięcia lokalu " +
                accommodationId,
            "Jeszcze nie działa :("
        );
        event.stopPropagation();
    };

    return (
        <Table hover striped responsive>
            <thead className="thead-dark">
                <tr>
                    <th>{t("accommodations.host")}</th>
                    <th>{t("accommodations.address")}</th>
                    <th>{t("accommodations.availability")}</th>
                    <th>{t("accommodations.volunteer")}</th>
                    <th>{t("accommodations.description")}</th>
                    <th>{t("accommodations.actions")}</th>
                </tr>
            </thead>
            <tbody>
                {accommodations.map((accommodation) => {
                    const { id } = accommodation;
                    return (
                        <AccommodationListItem
                            key={id}
                            accommodation={accommodation}
                            onEdit={onEdit}
                            onRemove={onRemove}
                        />
                    );
                })}
            </tbody>
        </Table>
    );
};

export default compose(
    withAccommodation,
    withToastManager,
    withRouter
)(AccommodationList);
