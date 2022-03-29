import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const HostFormCallBefore = () => {
    const fieldId = HostFormFields.CALL_BEFORE;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("host:form.label.callBefore")}</FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} type="time" />
        </FormGroup>
    );
};

export default HostFormCallBefore;
