import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormDate from "components/atoms/form/FormDate";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormPriorityDate = () => {
    const fieldId = GuestFormFields.PRIORITY_DATE;
    const { t } = useTranslation(["common", "guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.priorityDate")}
            </FormLabel>
            <Field
                component={FormDate}
                id={fieldId}
                name={fieldId}
                placeholder={t("common:form.placeholder.dateFormat")}
            />
        </FormGroup>
    );
};

export default GuestFormPriorityDate;
