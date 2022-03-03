import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { ApartmentFormFields } from "components/apartment/ApartmentFormFields";
import { FormItemsStates } from "components/molecules/form/FormItemsStates";

const ApartmentFormAddressState = (props) => {
    const fieldId = ApartmentFormFields.ADDRESS_STATE_NAME;

    const { t } = useTranslation();
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("apartment.address_state")}
            </Label>
            <Field
                component={FormItemsStates}
                id={fieldId}
                name={fieldId}
                placeholder="Janina Nowak"
                type="text"
            />
        </FormGroup>
    );
};

ApartmentFormAddressState.propTypes = {};

export default ApartmentFormAddressState;
