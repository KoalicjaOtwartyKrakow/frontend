import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import "components/accommodations/AccommodationList.sass";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppRoutes' or its co... Remove this comment to see the full error message
import { AppRoutes } from "constants/AppRoutes";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodations/Acco... Remove this comment to see the full error message
import AccommodationListItem from "components/accommodations/AccommodationListItem";

const AccommodationList = ({ accommodations }: any) => {
    const { t } = useTranslation(["accommodations"]);
    const navigate = useNavigate();

    const getEditRoute = (accommodationId: any) => {
        return generatePath(AppRoutes.ACCOMMODATION_EDIT, { accommodationId });
    };

    const onEdit = (accommodationId: any) => {
        const path = getEditRoute(accommodationId);
        navigate(path);
    };

    const onRemove = () => {};

    const columnNames = ["city", "address", "status", "capacity", "description", "information"];

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
                        <th key={columnName}>{t(`accommodations:list.columnHeader:${columnName}`)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {accommodations.map((accommodation: any) => {
                    const { uuid } = accommodation;
                    return (
                        <AccommodationListItem
                            key={uuid}
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

export default AccommodationList;
