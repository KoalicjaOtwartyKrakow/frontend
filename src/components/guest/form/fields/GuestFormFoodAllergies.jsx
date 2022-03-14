import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";

const GuestFormEmail = () => {
    const fieldId = GuestFormFields.EMAIL;

    const { t } = useTranslation(["guest"]);
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

GuestFormEmail.propTypes = {};

export default GuestFormEmail;
