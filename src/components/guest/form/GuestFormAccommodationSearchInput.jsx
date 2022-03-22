import React, { useContext, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useGetAccommodations } from "hooks/api/accommodationsHooks";
import GuestFormAccommodationSearchItem from "components/guest/form/GuestFormAccommodationSearchItem";
import { useTranslation } from "react-i18next";
import { AccommodationContext } from "components/accommodation/AccommodationContext";
import { isAccommodation } from "models/constants/Utils";

const GuestFormAccommodationSearchInput = ({ onAccommodationSelected }) => {
    const { t } = useTranslation(["guest"]);
    const accommodation = useContext(AccommodationContext);

    const [caseSensitive] = useState(false);
    const [ignoreDiacritics] = useState(true);

    const { accommodations, accommodationsGetError, accommodationsGetInProgress, retrieveAccommodations } =
        useGetAccommodations();

    const shouldFetchAccommodations = !(accommodations || accommodationsGetError || accommodationsGetInProgress);

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

    const renderMenuItemChildren = (accommodation) => {
        if (accommodation?.host === undefined || !accommodation) {
            return null;
        }
        return <GuestFormAccommodationSearchItem accommodation={accommodation} />;
    };

    const onChange = (options) => onAccommodationSelected(options[0]);

    const defaultSelected = isAccommodation(accommodation) ? [accommodation] : [];

    return (
        <>
            <Typeahead
                caseSensitive={caseSensitive}
                defaultSelected={defaultSelected}
                filterBy={["addressLine", "addressZip", "addressCity"]}
                id="accommodations-search"
                ignoreDiacritics={ignoreDiacritics}
                labelKey={getLabelKey}
                onChange={onChange}
                options={options}
                placeholder={t("guest:form.label.findAccommodation")}
                renderMenuItemChildren={renderMenuItemChildren}
                size="lg"
            />
        </>
    );
};

export default GuestFormAccommodationSearchInput;
