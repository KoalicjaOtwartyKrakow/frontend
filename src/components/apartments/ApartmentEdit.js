import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Routes from 'constants/Routes';

export const ApartmentEdit = ({ apartments }) => {
    const params = useParams();

    const { apartmentId } = params;

    const apartmentExists = apartments.some((apartment) => apartment.apartmentId === apartmentId);

    const onSubmit = () => {
    };

    if (!apartmentExists) {
        return <div>Invalid Apartment ID.</div>;
    }

    return (
        <div className="w-full max-w-sm container mt-20 mx-auto">
            <form onSubmit={onSubmit}>
                <h3>Edit Apartment</h3>
                <div className="text-center mt-4 text-gray-500">
                    <Link to={Routes.ROOT}>Cancel</Link>
                </div>
            </form>
        </div>
    );
};