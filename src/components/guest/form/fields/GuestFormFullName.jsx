import React from "react";
import { FormGroup, FormText } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormFullName = () => {
    const fieldId = GuestFormFields.FULL_NAME;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("common:form.label.fullName")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="Alexandra Bondarenko" type="text" />
            <FormText></FormText>
        </FormGroup>
    );
};

GuestFormFullName.propTypes = {};

export default GuestFormFullName;
