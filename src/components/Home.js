import React from "react";
import ApartmentsPage from 'components/pages/AppartmentsPage';
import apartments from 'models/mocks/apartments';
import { Card, CardBody, CardHeader } from 'reactstrap';

export const Home = () => {
  return (
    <React.Fragment>
        <Card>
            <CardHeader>
                <h3>Lista lokali</h3>
            </CardHeader>
            <CardBody>
                <ApartmentsPage />
            </CardBody>
        </Card>
    </React.Fragment>
  );
};