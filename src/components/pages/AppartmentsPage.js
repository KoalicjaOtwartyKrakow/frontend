import React from 'react';
import ApartmentList from 'components/apartments/ApartmentList';

const ApartmentsPage = ({ apartments }) => {

    return (
        <React.Fragment>
            {apartments.length > 0 ? (
                <React.Fragment>
                    <ApartmentList apartments={apartments} />
                </React.Fragment>
            ) : (
                <p className="text-center bg-gray-100 text-gray-500 py-5">Brak danych.</p>
            )}
        </React.Fragment>
    );
};

export default ApartmentsPage;