import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormDesiredDestination = (props) => {
    const fieldId = GuestFormFields.DESIRED_DESTINATION;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.desiredDestination")}</FormLabel>
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
