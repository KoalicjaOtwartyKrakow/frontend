import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";

const GuestFormFinanceStatus = () => {
    const fieldId = GuestFormFields.FINANCIAL_STATUS;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.financialStatus")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                type="text"
            />
        </FormGroup>
    );
};

GuestFormFinanceStatus.propTypes = {};

export default GuestFormFinanceStatus;
