import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormVolunteerName = (props) => {
    const fieldId = AccommodationFormFields.VOLUNTEER_NAME;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.volunteerName")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="Jan Kowalski"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormVolunteerName.propTypes = {};

export default AccommodationFormVolunteerName;
