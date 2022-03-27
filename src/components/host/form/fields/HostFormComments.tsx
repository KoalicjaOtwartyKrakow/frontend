import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { HostFormFields } from "components/host/HostFormFields";

import FormTextArea from "components/atoms/form/FormTextArea";

import FormLabel from "components/atoms/form/FormLabel";

const HostFormComments = () => {
    const fieldId = HostFormFields.COMMENTS;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("host:form.label.comments")}</FormLabel>
            <Field component={FormTextArea} id={fieldId} name={fieldId} type="textarea" rows={5} />
        </FormGroup>
    );
};

export default HostFormComments;
