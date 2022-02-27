import React from 'react';
import { Button, Badge, ButtonGroup } from 'reactstrap';
import './ApartmentListItem.sass';


/**
 *
 * @param {Apartment} apartment
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const ApartmentListItem = ({ apartment, onEdit, onRemove }) => {
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
                <p className="mb-0">
                    <strong className="apartment__street-name">
                        {apartment.addressStreetName}
                    </strong>
                    <strong className="apartment__street-number">
                        {apartment.addressStreetNumber}
                    </strong>
                    {
                        apartment.addressFlatNumber &&
                        <span className="apartment__flat-number">
                            / {apartment.addressFlatNumber}
                        </span>
                    }
                </p>
                <p>
                    <span>
                        {apartment.addressZip}
                        {' '}
                        {apartment.addressCity}
                        {', '}
                        {apartment.addressCountyName}
                    </span>

                </p>
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
                <Badge color="danger" className="apartment-availability">Brak</Badge>
            );
        }

        const badgeColor = peopleCountAllocated === 0 ? 'success' : 'info';

        return (
            <Badge color={badgeColor} className="apartment-availability">
                <span className="apartment-availability__count-allocated">{apartment.peopleCountAllocated}</span>{' / '}
                <span className="apartment-availability__count-max">{apartment.peopleCountMax}</span>
            </Badge>
        );
    };

    const getApartmentLandLord = (apartment) => {
        return (
            <>
                <span className="font-weight-semibold">{apartment.landlordName}</span>
                {
                    apartment.landlordEmail &&
                    <>
                        <br />
                        <a href={`mailto:${apartment.landlordEmail}`}>{apartment.landlordEmail}</a>
                    </>
                }
                <br />
                <span>{apartment.landlordPhone}</span>
            </>
        );
    };

    const apartmentAddress = getApartmentAddressContent(apartment);
    const apartmentAvailability = getApartmentAvailability(apartment);
    const apartmentLandlord = getApartmentLandLord(apartment);

    return (
        <tr key={id} onClick={handleEdit} className="pointer">
            <td>{apartmentLandlord}</td>
            <td>{apartmentAddress}</td>
            <td>
                <p>
                    {apartmentAvailability}
                </p>
            </td>
            <td>{apartment.volunteerName}</td>
            <td>{apartment.description}</td>
            <td>
                <ButtonGroup>
                    <Button color="danger" outline onClick={(event) => onRemove(id, event)}>Usuń</Button>
                </ButtonGroup>

            </td>
        </tr>
    );
};

export default ApartmentListItem;