import React from 'react';

const ApartmentListItem = ({ apartment, onEdit }) => {
    return (
        <tr key={ apartment.apartmentId } onClick={ () => onEdit(apartment.apartmentId) }>
            <td>{ apartment.LANDLORD_NAME }</td>
            <td>X</td>
            <td className="text-center">x</td>
            <td>X</td>
            <td>X</td>
        </tr>
    );
}

export default ApartmentListItem;