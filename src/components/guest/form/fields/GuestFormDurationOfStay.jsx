import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";

const GuestFormFullName = () => {
    const fieldId = GuestFormFields.FULL_NAME;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("common:form.label.fullName")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="Alexandra Bondarenko"
                type="text"
            />
        </FormGroup>
    );
};

GuestFormFullName.propTypes = {};

export default GuestFormFullName;
