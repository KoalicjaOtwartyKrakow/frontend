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

const HostFormCallAfter = () => {
    const fieldId = HostFormFields.CALL_AFTER;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("host:form.label.callAfter")}</FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} type="time" />
        </FormGroup>
    );
};

HostFormCallAfter.propTypes = {};

export default HostFormCallAfter;
