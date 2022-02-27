import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Routes from 'constants/Routes';
import withApartments from 'components/apartments/Apartments';
import PageCard from 'components/atoms/PageCard';

const ApartmentEditPage = ({ apartments }) => {
    const params = useParams();

    const { apartmentId } = params;

    const apartmentExists = apartments.some((apartment) => apartment.id === apartmentId);

    const onSubmit = () => {
    };

    if (!apartmentExists) {
        return <div>Invalid Apartment ID.</div>;
    }

    return (
        <PageCard header="Edycja lokalu">
            <form onSubmit={onSubmit}>
                <div className="text-center mt-4 text-gray-500">
                    <Link to={Routes.ROOT}>Cancel</Link>
                </div>
            </form>
        </PageCard>
    );
};

export default withApartments(ApartmentEditPage);