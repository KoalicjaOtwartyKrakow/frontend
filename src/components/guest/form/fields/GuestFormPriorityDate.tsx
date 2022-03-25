import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormDate... Remove this comment to see the full error message
import FormDate from "components/atoms/form/FormDate";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
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

GuestFormPriorityDate.propTypes = {};

export default GuestFormPriorityDate;
