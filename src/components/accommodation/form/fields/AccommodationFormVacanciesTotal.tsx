import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormInpu... Remove this comment to see the full error message
import FormInput from "components/atoms/form/FormInput";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
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

AccommodationFormVacanciesTotal.propTypes = {};

export default AccommodationFormVacanciesTotal;
