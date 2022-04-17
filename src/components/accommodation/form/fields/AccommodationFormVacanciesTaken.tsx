import React from "react";
import { FormGroup } from "reactstrap";
import { Field, useField } from "formik";
import { useTranslation } from "react-i18next";
import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormLabel from "components/atoms/form/FormLabel";
import { useRequired } from "components/shared/form/hooks/useRequired";

const AccommodationFormVacanciesTaken = () => {
    const fieldId = AccommodationFormFields.VACANCIES_TAKEN;

    const { t } = useTranslation(["accommodation"]);
    const { getRequiredClassName } = useRequired();
    const className = getRequiredClassName(fieldId);

    return (
        <FormGroup>
            <FormLabel for={fieldId} className={className}>
                {t("accommodation:form.label.vacanciesTaken")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="0" type="number" />
        </FormGroup>
    );
};

export default AccommodationFormVacanciesTaken;
