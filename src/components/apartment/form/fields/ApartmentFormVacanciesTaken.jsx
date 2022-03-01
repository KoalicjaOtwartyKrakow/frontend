import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormVacanciesTaken = (props) => {
    const fieldId = ApartmentFormFields.VACANCIES_TAKEN;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
            {t("apartment.vacancies_taken")}
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

ApartmentFormVacanciesTaken.propTypes = {};

export default ApartmentFormVacanciesTaken;
