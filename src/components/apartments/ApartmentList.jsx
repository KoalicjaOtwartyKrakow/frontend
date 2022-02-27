import React from 'react';
import { generatePath, withRouter } from 'react-router-dom';

import Routes from 'constants/Routes';
import { Table } from 'reactstrap';
import ApartmentListItem from 'components/apartments/ApartmentListItem';
import compose from 'just-compose';
import { withToastManager } from 'react-toast-notifications';
import { Toast } from 'components/atoms/Toast';
import withApartments from 'components/apartments/Apartments';

const ApartmentList = ({ apartments, history, toastManager }) => {

    const toast = new Toast(toastManager);

    const getEditRoute = (apartmentId) => {
        return generatePath(Routes.APARTMENTS_EDIT, { apartmentId });
    };

    const onEdit = (apartmentId) => {
        const path = getEditRoute(apartmentId);
        history.push(path);
    };

    const onRemove = (apartmentId, event) => {
        toast.info('Ta akcja będzie otwierać okno modalne z potwierdzeniem usunięcia lokalu ' + apartmentId, 'Jeszcze nie działa :(');
        event.stopPropagation();
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
                            onRemove={onRemove}
                        />
                    );
                })
            }
            </tbody>
        </Table>
    );
};

export default compose(
    withApartments,
    withToastManager,
    withRouter
)(ApartmentList);