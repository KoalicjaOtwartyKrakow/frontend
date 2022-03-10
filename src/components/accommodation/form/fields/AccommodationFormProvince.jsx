import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { FormItemsStates } from "components/molecules/form/FormItemsStates";

const AccommodationFormAddressState = (props) => {
    const fieldId = AccommodationFormFields.ADDRESS_STATE_NAME;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.addressProvince")}
            </Label>
            <Field component={FormItemsStates} id={fieldId} name={fieldId} />
        </FormGroup>
    );
};

AccommodationFormAddressState.propTypes = {};

export default AccommodationFormAddressState;
