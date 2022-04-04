import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormLabel from "components/atoms/form/FormLabel";
import { useRequired } from "components/shared/form/hooks/useRequired";
import useWorkflowStatus from "components/accommodation/form/hooks/useWorkflowStatus";

const AccommodationFormZip = () => {
    const fieldId = AccommodationFormFields.ADDRESS_ZIP;

    const { t } = useTranslation(["accommodation"]);
    const { isRequired } = useRequired();
    const workflowStatus = useWorkflowStatus();
    const className = isRequired(workflowStatus.shouldValidate);

    return (
        <FormGroup>
            <FormLabel for={fieldId} className={className}>
                {t("accommodation:form.label.addressZip")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="00-000" type="text" />
        </FormGroup>
    );
};

export default AccommodationFormZip;
