import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/host/HostFormFields... Remove this comment to see the full error message
import { HostFormFields } from "components/host/HostFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormSele... Remove this comment to see the full error message
import FormSelect from "components/atoms/form/FormSelect";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/HostStatus' o... Remove this comment to see the full error message
import { HostStatus } from "models/constants/HostStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const HostFormStatus = (props: any) => {
    const fieldId = HostFormFields.STATUS;

    const { t } = useTranslation(["host"]);

    const items = [
        {
            id: HostStatus.CREATED,
            name: t("host:status.created"),
        },
        {
            id: HostStatus.VERIFIED,
            name: t("host:status.verified"),
        },
        {
            id: HostStatus.REJECTED,
            name: t("host:status.rejected"),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("host:form.label.hostStatus")}
            </FormLabel>
            <Field component={FormSelect} id={fieldId} name={fieldId} items={items} />
        </FormGroup>
    );
};

HostFormStatus.propTypes = {};

export default HostFormStatus;
