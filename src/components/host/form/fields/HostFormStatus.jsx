import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { HostFormFields } from "components/host/HostFormFields";
import { FormItemsHostStatus } from "components/molecules/form/FormItemsHostStatus";
import FormLabel from "components/atoms/form/FormLabel";

const HostFormStatus = (props) => {
    const fieldId = HostFormFields.STATUS;
    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("host:form.label.hostStatus")}
            </FormLabel>
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
