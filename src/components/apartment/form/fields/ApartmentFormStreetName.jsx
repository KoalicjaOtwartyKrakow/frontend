import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormStreetName = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_STREET_NAME;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("apartment.street_name")}
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

ApartmentFormStreetName.propTypes = {};

export default ApartmentFormStreetName;
