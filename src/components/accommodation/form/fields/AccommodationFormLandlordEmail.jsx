import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormLandlordEmail = (props) => {
    const fieldId = AccommodationFormFields.LANDLORD_EMAIL;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation.email")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="imie.nazwisko@domena.tld"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormLandlordEmail.propTypes = {};

export default AccommodationFormLandlordEmail;
