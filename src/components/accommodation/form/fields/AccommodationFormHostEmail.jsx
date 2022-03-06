import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormHostEmail = (props) => {
    const fieldId = AccommodationFormFields.HOST_EMAIL;

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

AccommodationFormHostEmail.propTypes = {};

export default AccommodationFormHostEmail;
