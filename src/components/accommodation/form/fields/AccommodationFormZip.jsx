import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";

const AccommodationFormZip = (props) => {
    const fieldId = AccommodationFormFields.ADDRESS_ZIP;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.addressZip")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="XX-XXX"
                type="text"
            />
        </FormGroup>
    );
};

AccommodationFormZip.propTypes = {};

export default AccommodationFormZip;
