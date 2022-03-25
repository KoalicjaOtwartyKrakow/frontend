import React from "react";
import { FormGroup } from "reactstrap";
import { Field, useField } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/molecules/form/Form... Remove this comment to see the full error message
import { FormItemsVoivodeships } from "components/molecules/form/FormItemsVoivodeships";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormAddressVoivodeship = () => {
    const fieldId = AccommodationFormFields.ADDRESS_VOIVODESHIP;
    const [accommodationField] = useField(AccommodationFormFields.ID);
    const accommodationId = accommodationField.value;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.addressVoivodeship")}
            </FormLabel>
            <Field component={FormItemsVoivodeships} id={fieldId} name={fieldId} isPleaseSelect={!accommodationId} />
        </FormGroup>
    );
};

AccommodationFormAddressVoivodeship.propTypes = {};

export default AccommodationFormAddressVoivodeship;
