import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormAddressCity = (props) => {
    const fieldId = AccommodationFormFields.ADDRESS_CITY;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.addressCity")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="Kraków"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormAddressCity.propTypes = {};

export default AccommodationFormAddressCity;
