import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";

const HostFormEmail = () => {
    const fieldId = HostFormFields.EMAIL;

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

HostFormEmail.propTypes = {};

export default HostFormEmail;
