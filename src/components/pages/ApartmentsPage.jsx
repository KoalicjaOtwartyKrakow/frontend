import React from 'react';
import ApartmentList from 'components/apartments/ApartmentList';
import withApartments from 'components/apartments/Apartments';
import { Alert, Card, CardBody, CardHeader } from 'reactstrap';

const ApartmentsPage = ({ apartments, apartmentsErrorMessage, apartmentsInProgress, apartmentsSuccess }) => {

    return (
        <React.Fragment>
                <Card>
                    <CardHeader>
                        <h3>Lista lokali</h3>
                    </CardHeader>
                    <CardBody>
                        {
                            apartmentsInProgress && <p>Ściągam dane...</p>
                        }
                        {
                            apartmentsErrorMessage && <Alert color="danger">Błąd komunikacji z API</Alert>
                        }
                        {
                            apartmentsSuccess &&
                            <>
                                {apartments.length && <ApartmentList apartments={apartments} /> }
                                {!apartments.length && <Alert color="warning">Brak lokali.</Alert> }
                            </>
                        }
                    </CardBody>
                </Card>

        </React.Fragment>
    );
};

export default withApartments(ApartmentsPage);