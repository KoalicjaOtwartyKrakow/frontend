import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";

const GuestFormPeopleFemaleCount = (props) => {
    const fieldId = GuestFormFields.ADULT_FEMALE_COUNT;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.adultFemaleCount")}
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

GuestFormPeopleFemaleCount.propTypes = {};

export default GuestFormPeopleFemaleCount;
