import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormStaffComments = (props) => {
    const fieldId = AccommodationFormFields.STAFF_COMMENTS;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.description")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                type="textarea"
                rows={5}
            />
        </FormGroup>
    );
};

AccommodationFormStaffComments.propTypes = {};

export default AccommodationFormStaffComments;
