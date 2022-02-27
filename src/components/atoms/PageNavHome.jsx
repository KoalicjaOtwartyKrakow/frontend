import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Routes from 'constants/Routes';
import React from 'react';

const PageNavigationApartmentList = () => (
    <p className="text-center mb-0">
        <Button color="secondary" outline tag={Link} to={Routes.APARTMENTS}>
            Wróć do listy lokali
        </Button>
    </p>
);

export default PageNavigationApartmentList;