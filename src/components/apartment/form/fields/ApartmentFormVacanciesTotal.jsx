import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormVacanciesTotal = (props) => {
    const fieldId = ApartmentFormFields.VACANCIES_TOTAL;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("apartment.vacancies_total")}
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

ApartmentFormVacanciesTotal.propTypes = {};

export default ApartmentFormVacanciesTotal;
