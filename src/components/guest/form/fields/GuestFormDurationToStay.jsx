import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { GuestFormFields } from "components/guest/GuestFormFields";

const GuestFormDurationToStay = () => {
    const fieldId = GuestFormFields.DURATION_OF_STAY;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.durationToStay")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                type="text"
            />
        </FormGroup>
    );
};

GuestFormDurationToStay.propTypes = {};

export default GuestFormDurationToStay;
