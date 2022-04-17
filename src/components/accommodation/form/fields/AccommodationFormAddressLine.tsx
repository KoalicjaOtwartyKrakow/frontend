import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormLabel from "components/atoms/form/FormLabel";
import { useRequired } from "components/shared/form/hooks/useRequired";

const AccommodationFormAddressLine = () => {
    const fieldId = AccommodationFormFields.ADDRESS_LINE;

    const { t } = useTranslation(["accommodation"]);
    const { getRequiredClassName } = useRequired();
    const className = getRequiredClassName(fieldId);

    return (
        <FormGroup>
            <FormLabel for={fieldId} className={className}>
                {t("accommodation:form.label.addressLine")}
            </FormLabel>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="al. Powstania Warszawskiego 3A/44"
                type="text"
            />
        </FormGroup>
    );
};

export default AccommodationFormAddressLine;
