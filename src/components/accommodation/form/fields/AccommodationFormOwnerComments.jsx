import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";

const AccommodationFormOwnerComments = (props) => {
    const fieldId = AccommodationFormFields.OWNER_COMMENTS;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.comments")}
            </Label>
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
