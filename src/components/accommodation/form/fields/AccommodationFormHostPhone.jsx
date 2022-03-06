import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormHostPhone = (props) => {
    const fieldId = AccommodationFormFields.HOST_PHONE;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation.phone")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="+48 123 456 789"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormHostPhone.propTypes = {};

export default AccommodationFormHostPhone;
