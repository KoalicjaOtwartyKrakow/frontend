import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormVacanciesTotal = (props) => {
    const fieldId = AccommodationFormFields.VACANCIES_TOTAL;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation.vacancies_total")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="5"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormVacanciesTotal.propTypes = {};

export default AccommodationFormVacanciesTotal;
