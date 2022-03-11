import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormTextArea from "components/atoms/form/FormTextArea";

const AccommodationFormComments = (props) => {
    const fieldId = AccommodationFormFields.COMMENTS;

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

AccommodationFormComments.propTypes = {};

export default AccommodationFormComments;
