import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormVolunteerName = () => {
    const fieldId = AccommodationFormFields.VOLUNTEER_NAME;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.volunteerName")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="Jan Kowalski" type="text" />
        </FormGroup>
    );
};

AccommodationFormVolunteerName.propTypes = {};

export default AccommodationFormVolunteerName;
