import React from "react";
import { generatePath, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import compose from "just-compose";
import { withToastManager } from "react-toast-notifications";
import "components/accommodations/AccommodationList.sass";

import { Routes } from "constants/Routes";
import AccommodationListItem from "components/accommodations/AccommodationListItem";
import { Toast } from "components/atoms/Toast";
import withAccommodations from "components/accommodations/withAccommodations";

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

    const columnNames = [
        "city",
        "address",
        "status",
        "availability",
        "description",
    ];

    return (
        <Table hover striped responsive>
            <colgroup>
                {columnNames.map((columnName) => (
                    <col className={`accommodation__col-${columnName}`} />
                ))}
            </colgroup>
            <thead className="thead-dark">
                <tr>
                    {columnNames.map((columnName) => (
                        <th>{t(`accommodations.${columnName}`)}</th>
                    ))}
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
    withAccommodations,
    withToastManager,
    withRouter
)(AccommodationList);
