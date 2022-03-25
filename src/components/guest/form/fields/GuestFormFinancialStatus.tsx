import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormInpu... Remove this comment to see the full error message
import FormInput from "components/atoms/form/FormInput";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
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

GuestFormFinancialStatus.propTypes = {};

export default GuestFormFinancialStatus;
