import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";

const GuestFormChildren = (props) => {
    const fieldId = GuestFormFields.CHILDREN;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.children")}
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

export default GuestFormChildren;
