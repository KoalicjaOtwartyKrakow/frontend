import React from "react";
import { FormGroup, FormText } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";

import { GuestFormFields } from "components/guest/GuestFormFields";

import FormLabel from "components/atoms/form/FormLabel";

const GuestFormDurationToStay = () => {
    const fieldId = GuestFormFields.DURATION_OF_STAY;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.durationOfStay")}
            </FormLabel>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder={t("guest:form.placeholder.durationOfStay")}
                type="text"
            />
            <FormText>{t("guest:form.text.durationOfStay")}</FormText>
        </FormGroup>
    );
};

export default GuestFormDurationToStay;
