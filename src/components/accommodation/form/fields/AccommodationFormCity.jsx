import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import FormInput from "components/atoms/form/FormInput";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormAddressCity = () => {
    const fieldId = AccommodationFormFields.ADDRESS_CITY;

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.addressCity")}
            </FormLabel>
            <Field component={FormInput} id={fieldId} name={fieldId} placeholder="Kraków" type="text" />
        </FormGroup>
    );
};

AccommodationFormAddressCity.propTypes = {};

export default AccommodationFormAddressCity;
