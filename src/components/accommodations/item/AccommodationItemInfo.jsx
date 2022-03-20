import React, { useContext } from "react";
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import {
    IconDisabledPeopleFriendly,
    IconEasyAmbulanceAccess,
    IconParkingPlaceAvailable,
    IconPetsAllowed,
    IconPetsNotAllowed,
    IconPetsNotPresent,
    IconPetsPresent,
} from "components/shared/Icons";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemInfo = () => {
    /**
     *
     * @type {Accommodation}
     */
    const accommodation = useContext(AccommodationContext);

    const {
        petsAllowed,
        petsPresent,
        disabledPeopleFriendly,
        parkingPlaceAvailable,
        easyAmbulanceAccess,
    } = accommodation;

    return (
        <p className="h5 d-flex align-items-center">
            <span className="accommodation__col-pets-presence">
                {petsPresent && <IconPetsPresent />}
                {!petsPresent && <IconPetsNotPresent />}
            </span>
            <span className="accommodation__col-pets-acceptance">
                {petsAllowed && <IconPetsAllowed />}
                {!petsAllowed && <IconPetsNotAllowed />}
            </span>
            <span className="accommodation__col-easy-ambulance-access">
                {easyAmbulanceAccess && <IconEasyAmbulanceAccess />}
            </span>
            <span className="accommodation__col-disabled-people-friendly">
                {disabledPeopleFriendly && <IconDisabledPeopleFriendly />}
            </span>
            <span className="accommodation__col-parking-place-available">
                {parkingPlaceAvailable && <IconParkingPlaceAvailable />}
            </span>
        </p>
    );
};

export default AccommodationItemInfo;
