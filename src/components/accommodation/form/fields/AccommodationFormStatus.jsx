import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import FormOptionPleaseSelect from "components/atoms/form/FormOptionPleaseSelect";
import { AccommodationStatus } from "models/constants/AccomodationStatus";

const AccommodationFormAddressStatus = (props) => {
    const fieldId = AccommodationFormFields.STATUS;

    const accommodationStatusDropdownItems = Object.entries(
        AccommodationStatus
    ).map((item) => ({ id: item[1], name: item[1] }));

    const FormSelectStatus = (props) => (
        <FormSelect {...props} items={accommodationStatusDropdownItems}>
            <FormOptionPleaseSelect />
        </FormSelect>
    );

    const { t } = useTranslation(["accommodation"]);
    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.status")}
            </Label>
            <Field component={FormSelectStatus} id={fieldId} name={fieldId} />
        </FormGroup>
    );
};

AccommodationFormAddressStatus.propTypes = {};

export default AccommodationFormAddressStatus;
