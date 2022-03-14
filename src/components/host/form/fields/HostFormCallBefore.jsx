import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";

const HostFormCallBefore = () => {
    const fieldId = HostFormFields.CALL_BEFORE;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("host:form.label.callBefore")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                type="text"
            />
        </FormGroup>
    );
};

HostFormCallBefore.propTypes = {};

export default HostFormCallBefore;
