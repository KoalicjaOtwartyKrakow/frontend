import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormInpu... Remove this comment to see the full error message
import FormInput from "components/atoms/form/FormInput";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormFields... Remove this comment to see the full error message
import { HostFormFields } from "components/host/HostFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const HostFormEmail = () => {
    const fieldId = HostFormFields.EMAIL;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("common:form.label.email")}
            </FormLabel>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder={t("common:form.placeholder.email")}
                type="text"
            />
        </FormGroup>
    );
};

HostFormEmail.propTypes = {};

export default HostFormEmail;
