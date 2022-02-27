import React from 'react';
import { Button, Badge, ButtonGroup } from 'reactstrap';


/**
 *
 * @param {Apartment} apartment
 * @param {function} onEdit
 * @returns {JSX.Element}
 * @constructor
 */
const ApartmentListItem = ({ apartment, onEdit }) => {
    const { id } = apartment;
    const handleEdit = () => onEdit(id);

    /**
     *
     * @param {Apartment} apartment
     * @returns {JSX.Element}
     */
    const getApartmentAddressContent = (apartment) => {
        return (
            <address className="apartment">
                <span className="apartment__street-name">
                    {apartment.addressStreetName}
                </span>
                <span className="apartment__street-number">
                    {apartment.addressStreetNumber}
                </span>
                <span className="apartment__street-number">
                    {apartment.addressStreetNumber}
                </span>

                <span>{ apartment.addressStreetName } { apartment.addressStreetNumber}/{ apartment.addressFlatNumber}</span>
                <span>{ apartment.addressZip } { apartment.addressCity}, { apartment.addressCountyName }</span>

            </address>
        );
    };

    /**
     *
     * @param {Apartment} apartment
     * @returns {JSX.Element}
     */
    const getApartmentAvailability = (apartment) => {
        const { peopleCountAllocated, peopleCountMax } = apartment;

        if (peopleCountAllocated >= peopleCountMax) {
            return (
                <span className="apartment-availability">
                    <Badge color="danger" pill>Brak</Badge>
                </span>
            );
        }

        return (
            <span className="apartment-availability">
                <span className="apartment-availability__count-allocated">{apartment.peopleCountAllocated}</span>{' / '}
                <span className="apartment-availability__count-max">{apartment.peopleCountMax}</span>
            </span>
        );
    };

    const apartmentAddress = getApartmentAddressContent(apartment);
    const apartmentAvailability = getApartmentAvailability(apartment);

    return (
        <tr key={id} onClick={handleEdit}>
            <td>
                <span>{ apartment.landlordName }</span>
                <span>{ apartment.landlordEmail }</span>
                <span>{ apartment.landlordPhone }</span>
            </td>
            <td>{apartmentAddress}</td>
            <td>{apartmentAvailability}</td>
            <td>{apartment.volunteerName}</td>
            <td>{apartment.description}</td>
            <td>
                <ButtonGroup>
                    <Button color='primary'>Edytuj</Button>{' '}
                    <Button color='danger' outline>Usuń</Button>
                </ButtonGroup>

            </td>
        </tr>
    );
};

export default ApartmentListItem;