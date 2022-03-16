import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { HostFormFields } from "components/host/HostFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const HostFormFullName = () => {
    const fieldId = HostFormFields.FULL_NAME;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("common:form.label.fullName")}
            </FormLabel>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="Janina Nowak"
                type="text"
            />
        </FormGroup>
    );
};

HostFormFullName.propTypes = {};

export default HostFormFullName;
