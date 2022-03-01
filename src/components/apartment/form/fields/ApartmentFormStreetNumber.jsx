import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormStreetNumber = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_STREET_NUMBER;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("apartment.no")}
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

ApartmentFormStreetNumber.propTypes = {};

export default ApartmentFormStreetNumber;
