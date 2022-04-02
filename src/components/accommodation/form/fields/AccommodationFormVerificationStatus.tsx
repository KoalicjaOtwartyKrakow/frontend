import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { AccommodationVerificationStatus } from "models/constants/AccommodationVerificationStatus";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormAddressStatus = () => {
    const fieldId = AccommodationFormFields.VERIFICATION_STATUS;

    const { t } = useTranslation(["accommodation"]);

    const items = [
        {
            id: [AccommodationVerificationStatus.CREATED],
            name: t("accommodation:form.value.status.created"),
        },
        {
            id: [AccommodationVerificationStatus.VERIFIED],
            name: t("accommodation:form.value.status.verified"),
        },
        {
            id: [AccommodationVerificationStatus.REJECTED],
            name: t("accommodation:form.value.status.rejected"),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.status")}
            </FormLabel>
            <Field component={FormSelect} id={fieldId} name={fieldId} items={items} />
        </FormGroup>
    );
};

export default AccommodationFormAddressStatus;
