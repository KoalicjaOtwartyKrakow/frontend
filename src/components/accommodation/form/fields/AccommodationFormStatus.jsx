import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { AccommodationStatus } from "models/constants/AccommodationStatus";

const AccommodationFormAddressStatus = (props) => {
    const fieldId = AccommodationFormFields.STATUS;

    const { t } = useTranslation(["accommodation"]);

    const items = [
        {
            id: [AccommodationStatus.CREATED],
            name: t("accommodation:form.value.status.created"),
        },
        {
            id: [AccommodationStatus.VERIFIED],
            name: t("accommodation:form.value.status.verified"),
        },
        {
            id: [AccommodationStatus.REJECTED],
            name: t("accommodation:form.value.status.rejected"),
        },
    ];

    return (
        <FormGroup>
            <Label for={fieldId} className="required">
                {t("accommodation:form.label.status")}
            </Label>
            <Field
                component={FormSelect}
                id={fieldId}
                name={fieldId}
                items={items}
            />
        </FormGroup>
    );
};

AccommodationFormAddressStatus.propTypes = {};

export default AccommodationFormAddressStatus;
