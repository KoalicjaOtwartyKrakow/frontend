import React from 'react';
import { useParams } from 'react-router-dom';
import withApartments from 'components/apartments/Apartments';
import PageCard from 'components/atoms/PageCard';
import { Alert } from 'reactstrap';
import InProgress from 'components/atoms/InProgress';
import PageErrorMessage from 'components/atoms/PageErrorMessage';
import PageNavigationApartmentList from 'components/atoms/PageNavHome';

const ApartmentEditPage = ({ apartments, apartmentsErrorMessage, apartmentsInProgress, apartmentsSuccess }) => {
    const params = useParams();

    const { apartmentId } = params;

    const hasApartments = apartmentsSuccess && apartments.length > 0;
    const isRouteApartmentPresent = apartments.some((apartment) => apartment.id === apartmentId);
    const showEditForm = hasApartments && isRouteApartmentPresent;
    const showApartmentNotFoundVisible = hasApartments && !isRouteApartmentPresent;

    const onSubmit = () => {
    };

    return (
        <PageCard header="Edycja lokalu">
            <InProgress inProgress={apartmentsInProgress} />
            <PageErrorMessage isError={apartmentsErrorMessage}>{apartmentsErrorMessage}</PageErrorMessage>
            {
                showApartmentNotFoundVisible &&
                <Alert color="warning">Nie znaleziono takiego lokalu w bazie.</Alert>
            }
            {
                showEditForm &&
                <form onSubmit={onSubmit}>
                </form>
            }
            <PageNavigationApartmentList />
        </PageCard>
    );
};

export default withApartments(ApartmentEditPage);