import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormHostName = (props) => {
    const fieldId = AccommodationFormFields.HOST_NAME;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.host")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="Janina Nowak"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormHostName.propTypes = {};

export default AccommodationFormHostName;
