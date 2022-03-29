import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormDocumentNumber = () => {
    const fieldId = GuestFormFields.DOCUMENT_NUMBER;

    const { t } = useTranslation(["common"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.documentNumber")}</FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} type="text" />
        </FormGroup>
    );
};

export default GuestFormDocumentNumber;
