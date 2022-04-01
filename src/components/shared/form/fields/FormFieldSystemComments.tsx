import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import FormLabel from "components/atoms/form/FormLabel";

const FormFieldSystemComments = ({ fieldId }: { fieldId: string }) => {
    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("common:form.label.systemComments")}</FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} type="textarea" rows={5} disabled={true} />
        </FormGroup>
    );
};

export default FormFieldSystemComments;
