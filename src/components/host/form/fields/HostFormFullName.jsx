import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";

const HostFormFullName = () => {
    const fieldId = HostFormFields.FULL_NAME;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("host:form.label.fullName")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="Janina Nowak"
                type="text"
            />
        </FormGroup>
    );
};

HostFormFullName.propTypes = {};

export default HostFormFullName;
