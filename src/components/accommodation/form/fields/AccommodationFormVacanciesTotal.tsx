import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormVacanciesTotal = () => {
    const fieldId = AccommodationFormFields.VACANCIES_TOTAL;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.vacanciesTotal")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="5" type="number" />
        </FormGroup>
    );
};

export default AccommodationFormVacanciesTotal;
