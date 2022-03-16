import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormOwnerComments = () => {
    const fieldId = AccommodationFormFields.OWNER_COMMENTS;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>
                {t("accommodation:form.label.comments")}
            </FormLabel>
            <Field
                component={FormTextArea}
                id={fieldId}
                name={fieldId}
                type="textarea"
                rows={5}
            />
        </FormGroup>
    );
};

AccommodationFormOwnerComments.propTypes = {};

export default AccommodationFormOwnerComments;
