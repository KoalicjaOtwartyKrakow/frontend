import React, { useContext } from "react";
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { useTranslation } from "react-i18next";
import {
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
    const { t } = useTranslation();

    const { petsAllowed, petsPresent } = accommodation;

    return (
        <p className="h5">
            <span className="accommodation__col-pets-presence">
                {petsPresent && <IconPetsPresent />}
                {!petsPresent && <IconPetsNotPresent />}
            </span>
            <span className="accommodation__col-pets-acceptance">
                {petsAllowed && <IconPetsAllowed />}
                {!petsAllowed && <IconPetsNotAllowed />}
            </span>
        </p>
    );
};

export default AccommodationItemInfo;
