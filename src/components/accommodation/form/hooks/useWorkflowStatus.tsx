import React from "react";
import { useField } from "formik";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { AccommodationWorkflowStatus } from "models/constants/AccommodationWorkflowStatus";

const useWorkflowStatus = () => {
    const [workflowStatus] = useField(AccommodationFormFields.WORKFLOW_STATUS);
    const predicate = () => workflowStatus.value !== AccommodationWorkflowStatus.WITHDRAWN;

    const shouldValidate = predicate;

    return {
        shouldValidate,
    };
};

export default useWorkflowStatus;
