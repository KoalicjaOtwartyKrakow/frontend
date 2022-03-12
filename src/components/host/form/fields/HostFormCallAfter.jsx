import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";

const HostFormCallAfter = () => {
    const fieldId = HostFormFields.CALL_AFTER;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("host:form.label.callAfter")}
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

HostFormCallAfter.propTypes = {};

export default HostFormCallAfter;
