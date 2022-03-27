import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { HostFormFields } from "components/host/HostFormFields";

import FormSelect from "components/atoms/form/FormSelect";

import { HostStatus } from "models/constants/HostStatus";

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

export default HostFormStatus;
