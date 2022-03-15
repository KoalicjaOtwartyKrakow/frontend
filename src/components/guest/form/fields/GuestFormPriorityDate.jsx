import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormDate from "components/atoms/form/FormDate";

const GuestFormPriorityDate = () => {
    const fieldId = GuestFormFields.PRIORITY_DATE;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("common:form.label.email")}
            </Label>
            <Field
                component={FormDate}
                id={fieldId}
                name={fieldId}
                placeholder={t("common:form.placeholder.dateFormat")}
            />
        </FormGroup>
    );
};

GuestFormPriorityDate.propTypes = {};

export default GuestFormPriorityDate;
