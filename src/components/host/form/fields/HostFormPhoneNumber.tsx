import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";

import { HostFormFields } from "components/host/HostFormFields";

import FormLabel from "components/atoms/form/FormLabel";

const HostFormPhoneNumber = () => {
    const fieldId = HostFormFields.PHONE_NUMBER;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("common:form.label.phone")}
            </FormLabel>
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

export default HostFormPhoneNumber;
