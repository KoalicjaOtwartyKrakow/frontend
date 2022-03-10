import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormHostEmail = (props) => {
    const fieldId = AccommodationFormFields.HOST_EMAIL;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("common:form.label.email")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder={t("common:form.placeholder.email")}
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormHostEmail.propTypes = {};

export default AccommodationFormHostEmail;
