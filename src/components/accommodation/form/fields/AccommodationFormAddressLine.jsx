import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormAddressLine = (props) => {
    const fieldId = AccommodationFormFields.ADDRESS_STREET_NAME;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.addressLine")}
            </Label>
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
