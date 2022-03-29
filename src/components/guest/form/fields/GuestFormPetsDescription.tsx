import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormPetsDescription = (props: any) => {
    const fieldId = GuestFormFields.PETS_DESCRIPTION;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.petsDescription")}</FormLabel>
            <Field component={FormTextArea} id={fieldId} name={fieldId} type="textarea" rows={2} />
        </FormGroup>
    );
};

export default GuestFormPetsDescription;
