import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";

import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormStaffComments = () => {
    const fieldId = AccommodationFormFields.STAFF_COMMENTS;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("accommodation:form.label.description")}</FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} type="textarea" rows={5} />
        </FormGroup>
    );
};

export default AccommodationFormStaffComments;
