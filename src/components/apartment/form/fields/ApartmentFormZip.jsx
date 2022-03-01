import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormZip = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_ZIP;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
            {t('apartment.zip_code')}
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

ApartmentFormZip.propTypes = {};

export default ApartmentFormZip;
