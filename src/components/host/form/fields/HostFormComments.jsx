import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { HostFormFields } from "components/host/HostFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";

const HostFormComments = () => {
    const fieldId = HostFormFields.COMMENTS;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("host:form.label.comments")}
            </Label>
            <Field
                component={FormTextArea}
                id={fieldId}
                name={fieldId}
                type="textarea"
                rows={5}
            />
        </FormGroup>
    );
};

HostFormComments.propTypes = {};

export default HostFormComments;
