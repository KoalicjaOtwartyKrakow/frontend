import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";

const HostFormPhoneNumber = () => {
    const fieldId = HostFormFields.PHONE_NUMBER;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("common:form.label.phone")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder={t("common:form.placeholder.phone")}
                type="text"
            />
        </FormGroup>
    );
};

HostFormPhoneNumber.propTypes = {};

export default HostFormPhoneNumber;
