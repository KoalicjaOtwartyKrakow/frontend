import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import FormLabel from "components/atoms/form/FormLabel";
import { AccommodationWorkflowStatus } from "models/constants/AccommodationWorkflowStatus";

const AccommodationFormWorkflowStatus = () => {
    const fieldId = AccommodationFormFields.WORKFLOW_STATUS;

    const { t } = useTranslation(["accommodation"]);

    const items = [
        {
            id: [AccommodationWorkflowStatus.AVAILABLE],
            name: t("accommodation:form.value.workflowStatus.available"),
        },
        {
            id: [AccommodationWorkflowStatus.DONE],
            name: t("accommodation:form.value.workflowStatus.done"),
        },
        {
            id: [AccommodationWorkflowStatus.NEEDS_VERIFICATION],
            name: t("accommodation:form.value.workflowStatus.needsVerification"),
        },
        {
            id: [AccommodationWorkflowStatus.WITHDRAWN],
            name: t("accommodation:form.value.workflowStatus.withdrawn"),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.workflowStatus")}
            </FormLabel>
            <Field component={FormSelect} id={fieldId} name={fieldId} items={items} />
        </FormGroup>
    );
};

export default AccommodationFormWorkflowStatus;
