import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormFinancialStatus = () => {
    const fieldId = GuestFormFields.FINANCIAL_STATUS;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.financialStatus")}</FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} type="text" />
        </FormGroup>
    );
};

export default GuestFormFinancialStatus;
