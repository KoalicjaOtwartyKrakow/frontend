import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { FormItemsVoivodeships } from "components/molecules/form/FormItemsVoivodeships";

const AccommodationFormAddressVoivodeship = (props) => {
    const fieldId = AccommodationFormFields.ADDRESS_VOIVODESHIP;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.addressVoivodeship")}
            </Label>
            <Field
                component={FormItemsVoivodeships}
                id={fieldId}
                name={fieldId}
            />
        </FormGroup>
    );
};

AccommodationFormAddressVoivodeship.propTypes = {};

export default AccommodationFormAddressVoivodeship;
