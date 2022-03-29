import React, { useContext } from "react";
import { AccommodationContext } from "components/accommodation/AccommodationContext";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemCity = () => {
    const accommodation = useContext(AccommodationContext);

    const city = accommodation.addressCity;
    return <span className="accommodation__address-city fw-bold">{city}</span>;
};

export default AccommodationItemCity;
