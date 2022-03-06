import React from "react";
import { Badge, Button, ButtonGroup } from "reactstrap";
import { useTranslation } from "react-i18next";

import "components/accommodations/AccommodationListItem.sass";

/**
 *
 * @param {Accommodation} accommodation
 * @param {function} onEdit
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
const AccommodationListItem = ({ accommodation, onEdit, onRemove }) => {
    const { t } = useTranslation();

    const { id } = accommodation;
    const handleEdit = () => onEdit(id);

    /**
     *
     * @param {Accommodation} accommodation
     * @returns {JSX.Element}
     */
    const getAccommodationAddressContent = (accommodation) => {
        return (
            <address className="accommodation">
                <p className="mb-0">
                    <strong className="accommodation__street-name">
                        {accommodation.addressStreetName}
                    </strong>
                    <strong className="accommodation__street-number">
                        {accommodation.addressStreetNumber}
                    </strong>
                    {accommodation.addressFlatNumber && (
                        <span className="accommodation__flat-number">
                            / {accommodation.addressFlatNumber}
                        </span>
                    )}
                </p>
                <p>
                    <span>
                        {accommodation.addressZip} {accommodation.addressCity}
                        {", "}
                        {accommodation.addressStateName}
                    </span>
                </p>
            </address>
        );
    };

    /**
     *
     * @param {Accommodation} accommodation
     * @returns {JSX.Element}
     */
    const getAccommodationAvailability = (accommodation) => {
        const { vacanciesTaken, vacanciesTotal } = accommodation;

        if (vacanciesTaken >= vacanciesTotal) {
            return (
                <Badge color="danger" className="accommodation-availability">
                    {t("accommodations.none")}
                </Badge>
            );
        }

        const badgeColor = vacanciesTaken === 0 ? "success" : "info";

        return (
            <Badge color={badgeColor} className="accommodation-availability">
                <span className="accommodation-availability__count-allocated">
                    {accommodation.vacanciesTaken}
                </span>
                {" / "}
                <span className="accommodation-availability__count-max">
                    {accommodation.vacanciesTotal}
                </span>
            </Badge>
        );
    };

    const getAccommodationLandLord = (accommodation) => {
        return (
            <>
                <span className="font-weight-semibold">
                    {accommodation.landlordName}
                </span>
                {accommodation.landlordEmail && (
                    <>
                        <br />
                        <a href={`mailto:${accommodation.landlordEmail}`}>
                            {accommodation.landlordEmail}
                        </a>
                    </>
                )}
                <br />
                <span>{accommodation.landlordPhone}</span>
            </>
        );
    };

    const accommodationAddress = getAccommodationAddressContent(accommodation);
    const accommodationAvailability =
        getAccommodationAvailability(accommodation);
    const accommodationLandlord = getAccommodationLandLord(accommodation);

    return (
        <tr key={id} onClick={handleEdit} className="pointer">
            <td>{accommodationLandlord}</td>
            <td>{accommodationAddress}</td>
            <td>
                <p>{accommodationAvailability}</p>
            </td>
            <td>{accommodation.volunteerName}</td>
            <td>{accommodation.description}</td>
            <td>
                <ButtonGroup>
                    <Button
                        color="danger"
                        outline
                        onClick={(event) => onRemove(id, event)}
                    >
                        {t("accommodations.delete")}
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default AccommodationListItem;
