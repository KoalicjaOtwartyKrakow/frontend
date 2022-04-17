import React from "react";
import { FormGroup } from "reactstrap";
import { Field, useField } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { FormItemsVoivodeships } from "components/molecules/form/FormItemsVoivodeships";
import FormLabel from "components/atoms/form/FormLabel";
import { useRequired } from "components/shared/form/hooks/useRequired";

const AccommodationFormAddressVoivodeship = () => {
    const fieldId = AccommodationFormFields.ADDRESS_VOIVODESHIP;
    const [accommodationField] = useField(AccommodationFormFields.ID);
    const accommodationId = accommodationField.value;

    const { t } = useTranslation(["accommodation"]);
    const { getRequiredClassName } = useRequired();
    const className = getRequiredClassName(fieldId);

    return (
        <FormGroup>
            <FormLabel for={fieldId} className={className}>
                {t("accommodation:form.label.addressVoivodeship")}
            </FormLabel>
            <Field component={FormItemsVoivodeships} id={fieldId} name={fieldId} isPleaseSelect={!accommodationId} />
        </FormGroup>
    );
};

export default AccommodationFormAddressVoivodeship;
