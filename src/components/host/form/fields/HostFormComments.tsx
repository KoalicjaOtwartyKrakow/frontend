import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormFields... Remove this comment to see the full error message
import { HostFormFields } from "components/host/HostFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormText... Remove this comment to see the full error message
import FormTextArea from "components/atoms/form/FormTextArea";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const HostFormComments = () => {
    const fieldId = HostFormFields.COMMENTS;

    const { t } = useTranslation(["host"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("host:form.label.comments")}</FormLabel>
            <Field component={FormTextArea} id={fieldId} name={fieldId} type="textarea" rows={5} />
        </FormGroup>
    );
};

HostFormComments.propTypes = {};

export default HostFormComments;
