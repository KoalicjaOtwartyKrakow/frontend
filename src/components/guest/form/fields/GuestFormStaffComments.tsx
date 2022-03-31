import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormStaffComments = () => {
    const fieldId = GuestFormFields.STAFF_COMMENTS;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.staffComments")}</FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} type="textarea" rows={5} />
        </FormGroup>
    );
};

export default GuestFormStaffComments;
