import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormCheckbox from "components/atoms/form/FormCheckbox";

const checkboxField = ({ name, label }: any) => {
    return <Field id={name} key={name} name={name} type="checkbox" label={label} component={FormCheckbox} inline />;
};

const AccommodationFormAccessibility = () => {
    const { t } = useTranslation(["accommodation"]);

    const accessibilityCheckboxes = [
        {
            name: AccommodationFormFields.DISABLED_PEOPLE_FRIENDLY,
            label: t("accommodation:form.label.disabledPeopleFriendly"),
        },
        {
            name: AccommodationFormFields.LGBT_FRIENDLY,
            label: t("accommodation:form.label.lgbtFriendly"),
        },
        {
            name: AccommodationFormFields.PARKING_PLACE,
            label: t("accommodation:form.label.parkingPlace"),
        },
        {
            name: AccommodationFormFields.EASY_AMBULANCE_ACCESS,
            label: t("accommodation:form.label.easyAmbulanceAccess"),
        },
    ];

    return (
        <FormGroup tag="fieldset">
            <legend className="form-label">
                {t("accommodation:form.label.accessibility")}
                {":"}
            </legend>
            {accessibilityCheckboxes.map(checkboxField)}
        </FormGroup>
    );
};

export default AccommodationFormAccessibility;
