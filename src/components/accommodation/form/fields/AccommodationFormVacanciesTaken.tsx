import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";

import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormVacanciesTaken = () => {
    const fieldId = AccommodationFormFields.VACANCIES_TAKEN;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.vacanciesTaken")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="0" type="number" />
        </FormGroup>
    );
};

export default AccommodationFormVacanciesTaken;
