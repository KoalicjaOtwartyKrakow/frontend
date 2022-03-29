import React, { useCallback, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useGetAccommodations } from "hooks/api/accommodationsHooks";
import GuestFormAccommodationSearchItem from "components/guest/form/GuestFormAccommodationSearchItem";
import { useTranslation } from "react-i18next";
import { emptyArray } from "services/Api/utils";
import { classToPlain, plainToClass } from "serializers/Serializer";
import GuestAccommodation from "models/GuestAccommodation";
import { useField } from "formik";
import { GuestFormFields } from "components/guest/GuestFormFields";
import { FormGroup } from "reactstrap";
import FormLabel from "components/atoms/form/FormLabel";
import { Option } from "react-bootstrap-typeahead/types/types";

const GuestFormAccommodationSearchInput = ({ onAccommodationSelected }: any) => {
    const { t } = useTranslation(["guest"]);

    const [field, , fieldHelper] = useField(GuestFormFields.ACCOMMODATION_UNIT);

    /**
     * @type {GuestAccommodation}
     */
    const guestAccommodation = field.value;

    const [caseSensitive] = useState(false);
    const [ignoreDiacritics] = useState(true);

    const { accommodations, accommodationsGetError, accommodationsGetInProgress, retrieveAccommodations } =
        useGetAccommodations();

    const shouldFetchAccommodations = !(accommodations || accommodationsGetError || accommodationsGetInProgress);

    const getGuestAccommodations = useCallback(() => {
        if (accommodations?.length) {
            return Array.from(accommodations || emptyArray, (accommodation) => {
                const plain = classToPlain(accommodation);
                return plainToClass(GuestAccommodation, plain);
            });
        }
        return emptyArray;
    }, [accommodations]);

    const guestAccommodations = getGuestAccommodations();

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
    const getLabelKey = (accommodation: any) => {
        const { addressLine, addressZip, addressCity } = accommodation;
        const host = accommodation.host;
        const address = `${addressLine}, ${addressZip} ${addressCity}`;
        const hostInfo = host ? ` (${host.fullName})` : "";
        return `${address}${hostInfo}`;
    };

    const renderMenuItemChildren = (accommodation: Option) => {
        return <GuestFormAccommodationSearchItem accommodation={accommodation as GuestAccommodation} />;
    };

    const onChange = (selectedOptions: any) => {
        const value = selectedOptions[0];
        fieldHelper.setValue(value);
        onAccommodationSelected(value);
    };

    const getSelectedGuestAccommodation = useCallback(() => {
        return GuestAccommodation.is(guestAccommodation) ? [guestAccommodation] : emptyArray;
    }, [guestAccommodation]);

    const selectedGuestAccommodation = getSelectedGuestAccommodation();

    return (
        <FormGroup>
            <FormLabel>{t("guest:form.label.assignedAccommodation")}</FormLabel>
            <Typeahead
                caseSensitive={caseSensitive}
                defaultSelected={selectedGuestAccommodation}
                filterBy={["addressLine", "addressZip", "addressCity"]}
                id="accommodations-search"
                ignoreDiacritics={ignoreDiacritics}
                labelKey={getLabelKey}
                onChange={onChange}
                options={guestAccommodations}
                placeholder={t("guest:form.label.findAccommodation")}
                renderMenuItemChildren={renderMenuItemChildren}
                size="lg"
            />
        </FormGroup>
    );
};

export default GuestFormAccommodationSearchInput;
