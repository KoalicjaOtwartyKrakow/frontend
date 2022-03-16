import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormAddressLine = () => {
    const fieldId = AccommodationFormFields.ADDRESS_LINE;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
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

AccommodationFormAddressLine.propTypes = {};

export default AccommodationFormAddressLine;
