import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";

const GuestFormPhoneNumber = () => {
    const fieldId = GuestFormFields.PHONE_NUMBER;

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

GuestFormPhoneNumber.propTypes = {};

export default GuestFormPhoneNumber;
