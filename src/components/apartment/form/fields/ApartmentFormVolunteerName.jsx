import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormVolunteerName = (props) => {
    const fieldId = ApartmentFormFields.VOLUNTEER_NAME;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("apartment.volunteer_name")}
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

ApartmentFormVolunteerName.propTypes = {};

export default ApartmentFormVolunteerName;
