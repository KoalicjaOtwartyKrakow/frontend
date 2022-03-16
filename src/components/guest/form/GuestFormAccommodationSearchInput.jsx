import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useGetAccommodations } from "hooks/api/accommodationsHooks";
import GuestFormAccommodationSearchItem from "components/guest/form/GuestFormAccommodationSearchItem";
import { useTranslation } from "react-i18next";

const GuestFormAccommodationSearchInput = ({ onAccommodationSelected }) => {
    const { t } = useTranslation(["guest"]);

    const [caseSensitive] = useState(false);
    const [ignoreDiacritics] = useState(true);

    const {
        accommodations,
        accommodationsGetError,
        accommodationsGetInProgress,
        retrieveAccommodations,
    } = useGetAccommodations();

    const shouldFetchAccommodations = !(
        accommodations ||
        accommodationsGetError ||
        accommodationsGetInProgress
    );

    const options = accommodations || [];

    useEffect(() => {
        if (shouldFetchAccommodations) {
            retrieveAccommodations();
        }
    }, [retrieveAccommodations, shouldFetchAccommodations]);

    /**
     *
     * @param {Accommodation} accommodation
     * @returns {string}
     */
    const getLabelKey = (accommodation) => {
        const { addressLine, addressZip, addressCity } = accommodation;
        const host = accommodation.host;
        const address = `${addressLine}, ${addressZip} ${addressCity}`;
        const hostInfo = host ? ` (${host.fullName})` : "";
        return `${address}${hostInfo}`;
    };

    return (
        <>
            <Typeahead
                size="lg"
                caseSensitive={caseSensitive}
                id="accommodations-search"
                ignoreDiacritics={ignoreDiacritics}
                options={options}
                placeholder={t("guest:form.label.findAccommodation")}
                labelKey={getLabelKey}
                filterBy={["addressLine", "addressZip", "addressCity"]}
                onChange={(options) => onAccommodationSelected(options[0])}
                renderMenuItemChildren={(accommodation) => (
                    <GuestFormAccommodationSearchItem
                        accommodation={accommodation}
                    />
                )}
            />
        </>
    );
};

export default GuestFormAccommodationSearchInput;
