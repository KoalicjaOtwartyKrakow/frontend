import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";

const GuestFormDesiredDestination = (props) => {
    const fieldId = GuestFormFields.DESIRED_DESTINATION;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("guest:form.label.desiredDestination")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder={t("guest:form.placeholder.desiredDestination")}
                type="text"
            />
        </FormGroup>
    );
};

GuestFormDesiredDestination.propTypes = {};

export default GuestFormDesiredDestination;
