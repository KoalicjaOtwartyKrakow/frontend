import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormStreetNumber = (props) => {
    const fieldId = AccommodationFormFields.ADDRESS_STREET_NUMBER;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation.no")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="4A"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormStreetNumber.propTypes = {};

export default AccommodationFormStreetNumber;
