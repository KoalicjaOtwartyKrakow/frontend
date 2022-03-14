import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { HostFormFields } from "components/host/HostFormFields";
import { FormItemsHostStatus } from "components/molecules/form/FormItemsHostStatus";

const HostFormStatus = (props) => {
    const fieldId = HostFormFields.STATUS;
    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("host:form.label.hostStatus")}
            </Label>
            <Field
                component={FormItemsHostStatus}
                id={fieldId}
                name={fieldId}
            />
        </FormGroup>
    );
};

HostFormStatus.propTypes = {};

export default HostFormStatus;
