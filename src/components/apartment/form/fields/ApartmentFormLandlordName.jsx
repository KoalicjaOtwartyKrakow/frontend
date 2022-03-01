import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";

const ApartmentFormLandlordName = (props) => {
    const fieldId = ApartmentFormFields.LANDLORD_NAME;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("apartment.host")}
            </Label>
            <Field
                component={FormInput}
                id={fieldId}
                name={fieldId}
                placeholder="Janina Nowak"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormLandlordName.propTypes = {};

export default ApartmentFormLandlordName;
