import React from 'react';
import { generatePath, withRouter } from 'react-router-dom';

import Routes from 'constants/Routes';
import { Table } from 'reactstrap';
import ApartmentListItem from 'components/apartments/ApartmentListItem';

const ApartmentList = ({ apartments, history }) => {

    const getEditRoute = (apartmentId) => {
        return generatePath(Routes.APARTMENTS_EDIT, { apartmentId });
    };

    const onEdit = (apartmentId) => {
        const path = getEditRoute(apartmentId);
        history.push(path);
    };

    return (
        <Table hover striped responsive>
            <thead className="thead-dark">
            <tr>
                <th>Udostępniający</th>
                <th>Adres</th>
                <th>Dostępność</th>
                <th>Wolontariusz</th>
                <th>Opis</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {
                apartments.map((apartment) => {
                    const { id } = apartment;
                    return (
                        <ApartmentListItem
                            key={id}
                            apartment={apartment}
                            onEdit={onEdit}
                        />
                    );
                })
            }
            </tbody>
        </Table>
    );
};

export default withRouter(ApartmentList);