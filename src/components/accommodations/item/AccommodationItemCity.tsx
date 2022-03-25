import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationContext } from "components/accommodation/AccommodationContext";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemCity = () => {
    const accommodation = useContext(AccommodationContext);
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const city = accommodation.addressCity;
    return <span className="accommodation__address-city fw-bold">{city}</span>;
};

export default AccommodationItemCity;
