import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { GlobalContext } from 'context/GlobalState';

export const ApartmentEdit = () => {
    const params = useParams();

    const { apartments } = useContext(GlobalContext);
    const { apartmentId } = params;

    const apartmentExists = apartments.some((apartment) => apartment.apartmentId === apartmentId);


    const [ selectedApartment, setSelectedApartment ] = useState({
        id: null,
        name: '',
        designation: '',
        location: '',
    });


    useEffect(() => {
        const selectedAppartment = apartments.find(
            (currentAppartmentTraversal) => currentAppartmentTraversal.apartmentId === parseInt(apartmentId)
        );
        setSelectedApartment(selectedAppartment);
    }, [ apartmentId, apartments ]);

    const onSubmit = (e) => {
        // e.preventDefault();
        // editAppartment(selectedAppartment);
        // // history.push("/");
    };

    const handleOnChange = (userKey, newValue) =>
        setSelectedApartment({ ...selectedApartment, [userKey]: newValue });

    if (!apartmentExists) {
        return <div>Invalid Apartment ID.</div>;
    }

    return (
        <div className="w-full max-w-sm container mt-20 mx-auto">
            <form onSubmit={onSubmit}>
                chuj
                <div className="text-center mt-4 text-gray-500">
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        </div>
    );
};