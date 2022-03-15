import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";

const GuestFormPeopleMaleCount = (props) => {
    const fieldId = GuestFormFields.PEOPLE_MALE_COUNT;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.peopleMaleCount")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="0"
                type="number"
            />
        </FormGroup>
    );
};

GuestFormPeopleMaleCount.propTypes = {};

export default GuestFormPeopleMaleCount;
