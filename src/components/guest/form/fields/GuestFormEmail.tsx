import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";

import { GuestFormFields } from "components/guest/GuestFormFields";

import FormLabel from "components/atoms/form/FormLabel";

const GuestFormEmail = () => {
    const fieldId = GuestFormFields.EMAIL;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("common:form.label.email")}</FormLabel>
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

export default GuestFormEmail;
