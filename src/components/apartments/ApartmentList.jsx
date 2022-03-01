import React from "react";
import { generatePath, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import compose from "just-compose";
import { withToastManager } from "react-toast-notifications";

import Routes from "constants/Routes";
import ApartmentListItem from "components/apartments/ApartmentListItem";
import { Toast } from "components/atoms/Toast";
import withApartments from "components/apartments/Apartments";

const ApartmentList = ({ apartments, history, toastManager }) => {
    const { t } = useTranslation();

    const toast = new Toast(toastManager);

    const getEditRoute = (apartmentId) => {
        return generatePath(Routes.APARTMENTS_EDIT, { apartmentId });
    };

    const onEdit = (apartmentId) => {
        const path = getEditRoute(apartmentId);
        history.push(path);
    };

    const onRemove = (apartmentId, event) => {
        toast.info(
            "Ta akcja będzie otwierać okno modalne z potwierdzeniem usunięcia lokalu " +
                apartmentId,
            "Jeszcze nie działa :("
        );
        event.stopPropagation();
    };

    return (
        <Table hover striped responsive>
            <thead className="thead-dark">
                <tr>
                    <th>{t("apartments.host")}</th>
                    <th>{t("apartments.address")}</th>
                    <th>{t("apartments.availability")}</th>
                    <th>{t("apartments.volunteer")}</th>
                    <th>{t("apartments.description")}</th>
                    <th>{t("apartments.actions")}</th>
                </tr>
            </thead>
            <tbody>
                {apartments.map((apartment) => {
                    const { id } = apartment;
                    return (
                        <ApartmentListItem
                            key={id}
                            apartment={apartment}
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
    withApartments,
    withToastManager,
    withRouter
)(ApartmentList);
