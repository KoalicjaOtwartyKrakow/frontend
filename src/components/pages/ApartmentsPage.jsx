import React from 'react';
import ApartmentList from 'components/apartments/ApartmentList';
import withApartments from 'components/apartments/Apartments';
import { Alert } from 'reactstrap';
import PageCard from 'components/atoms/PageCard';
import InProgress from 'components/atoms/InProgress';
import PageErrorMessage from 'components/atoms/PageErrorMessage';

const ApartmentsPage = ({ apartments, apartmentsErrorMessage, apartmentsInProgress, apartmentsSuccess }) => {

    const apartmentCount = apartmentsSuccess ? `(znaleziono: ${apartments.length})` : '';
    const pageHeader = `Lista wszystkich lokali ${apartmentCount}`;

    return (
        <PageCard header={pageHeader}>
            <InProgress inProgress={apartmentsInProgress} />
            <PageErrorMessage isError={apartmentsErrorMessage}>{apartmentsErrorMessage}</PageErrorMessage>
            {
                apartmentsSuccess &&
                <>
                    {apartments.length && <ApartmentList apartments={apartments} /> }
                    {!apartments.length && <Alert color="warning">Nie znaleziono żadnych lokali w bazie.</Alert> }
                </>
            }
        </PageCard>
    );
};

export default withApartments(ApartmentsPage);