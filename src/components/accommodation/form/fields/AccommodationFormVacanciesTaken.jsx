import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormVacanciesTaken = (props) => {
    const fieldId = AccommodationFormFields.VACANCIES_TAKEN;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.vacanciesTaken")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="0"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormVacanciesTaken.propTypes = {};

export default AccommodationFormVacanciesTaken;
