import React from "react";
import { generatePath, useHistory, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import "components/accommodations/AccommodationList.sass";

import { Routes } from "constants/Routes";
import AccommodationListItem from "components/accommodations/AccommodationListItem";

const AccommodationList = ({ accommodations }) => {
    const { t } = useTranslation(["accommodations"]);
    const history = useHistory();

    const getEditRoute = (accommodationId) => {
        return generatePath(Routes.ACCOMMODATION_EDIT, { accommodationId });
    };

    const onEdit = (accommodationId) => {
        const path = getEditRoute(accommodationId);
        history.push(path);
    };

    const onRemove = () => {};

    const columnNames = [
        "city",
        "address",
        "status",
        "capacity",
        "description",
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
                            {t(
                                `accommodations:list.columnHeader:${columnName}`
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {accommodations.map((accommodation) => {
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
