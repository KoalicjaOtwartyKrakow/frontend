import React, { useCallback, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/accommodationsHooks'... Remove this comment to see the full error message
import { useGetAccommodations } from "hooks/api/accommodationsHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/form/GuestFor... Remove this comment to see the full error message
import GuestFormAccommodationSearchItem from "components/guest/form/GuestFormAccommodationSearchItem";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/utils' or its cor... Remove this comment to see the full error message
import { emptyArray } from "services/Api/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/Serializer' or its... Remove this comment to see the full error message
import { classToPlain, plainToClass } from "serializers/Serializer";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/GuestAccommodation' or ... Remove this comment to see the full error message
import GuestAccommodation from "models/GuestAccommodation";
import { useField } from "formik";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
import { FormGroup } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

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

    const renderMenuItemChildren = (accommodation: any) => {
        if (accommodation?.host === undefined || !accommodation) {
            return null;
        }
        return <GuestFormAccommodationSearchItem accommodation={accommodation} />;
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
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(accommodation: any) => JSX.Element | null' ... Remove this comment to see the full error message
                renderMenuItemChildren={renderMenuItemChildren}
                size="lg"
            />
        </FormGroup>
    );
};

export default GuestFormAccommodationSearchInput;
