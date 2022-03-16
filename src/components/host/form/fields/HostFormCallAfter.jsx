import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const HostFormCallAfter = () => {
    const fieldId = HostFormFields.CALL_AFTER;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>
                {t("host:form.label.callAfter")}
            </FormLabel>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                type="time"
            />
        </FormGroup>
    );
};

HostFormCallAfter.propTypes = {};

export default HostFormCallAfter;
