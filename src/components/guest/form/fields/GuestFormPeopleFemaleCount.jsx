import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormPeopleFemaleCount = (props) => {
    const fieldId = GuestFormFields.PEOPLE_FEMALE_COUNT;

    const { t } = useTranslation(["guest"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.peopleFemaleCount")}
            </FormLabel>
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

GuestFormPeopleFemaleCount.propTypes = {};

export default GuestFormPeopleFemaleCount;
