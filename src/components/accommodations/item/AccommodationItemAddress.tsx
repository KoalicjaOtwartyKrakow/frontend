import { getPolishVoivodeshipNameById } from "models/constants/Address";
import React, { useContext } from "react";

import { AccommodationContext } from "components/accommodation/AccommodationContext";

const AccommodationItemAddress = () => {
    const accommodation = useContext(AccommodationContext);
    const voivodeship = getPolishVoivodeshipNameById(accommodation.addressVoivodeship);
    return (
        <address className="accommodation">
            <p className="mb-0">
                <span className="accommodation__address-line fw-semibold">{accommodation.addressLine}</span>
            </p>
            <p>
                <span className="accommodation__address-zip">{accommodation.addressZip}</span>

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
