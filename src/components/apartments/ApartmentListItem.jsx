import React from 'react';
import {Alert} from "reactstrap";

const ApartmentListItem = ({ apartment, onEdit }) => {
    return (
        <tr key={ apartment.id } onClick={ () => onEdit(apartment.id) }>
            <td>
                <div>{ apartment.landlordName }</div>
                <div>{ apartment.landlordEmail }</div>
                <div>{ apartment.landlordPhone }</div>
            </td>
            <td>
                <div>{ apartment.addressStreetName } { apartment.addressStreetNumber}/{ apartment.addressFlatNumber}</div>
                <div>{ apartment.addressZip } { apartment.addressCity}, { apartment.addressCountyName }</div>
            </td>
            <td className="text-center">
                {
                    apartment.peopleCountTaken == apartment.peopleCount && <Alert color="danger">Brak</Alert>
                }
                {
                    apartment.peopleCountTaken < apartment.peopleCount && <p>{apartment.peopleCountTaken} / {apartment.peopleCount}</p>
                }
            </td>
            <td>{apartment.volunteerName}</td>
            <td>{apartment.description}</td>
        </tr>
    );
}

export default ApartmentListItem;