import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormLandlordEmail = (props) => {
    const fieldId = ApartmentFormFields.LANDLORD_EMAIL;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("apartment.email")}
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

ApartmentFormLandlordEmail.propTypes = {};

export default ApartmentFormLandlordEmail;
