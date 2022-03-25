// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/Address' or i... Remove this comment to see the full error message
import { getPolishVoivodeshipNameById } from "models/constants/Address";
import React, { useContext } from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationContext } from "components/accommodation/AccommodationContext";

/**
 *
 * @returns {JSX.Element}
 */
const AccommodationItemAddress = () => {
    const accommodation = useContext(AccommodationContext);
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const voivodeship = getPolishVoivodeshipNameById(accommodation.addressVoivodeship);
    return (
        <address className="accommodation">
            <p className="mb-0">
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                <span className="accommodation__address-line fw-semibold">{accommodation.addressLine}</span>
            </p>
            <p>
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                <span className="accommodation__address-zip">{accommodation.addressZip}</span>
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                <span className="accommodation__address-city"> {accommodation.addressCity}</span>
                {voivodeship && (
                    <>
                        {", "}
                        <span className="accommodation__address-voivodeship">{voivodeship}</span>
                    </>
                )}
            </p>
        </address>
    );
};

export default AccommodationItemAddress;
