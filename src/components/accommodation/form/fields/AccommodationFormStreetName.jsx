import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormStreetName = (props) => {
    const fieldId = AccommodationFormFields.ADDRESS_STREET_NAME;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation.street_name")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="al. Powstania Warszawskiego"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormStreetName.propTypes = {};

export default AccommodationFormStreetName;
